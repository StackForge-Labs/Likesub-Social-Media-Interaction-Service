using System.Collections.Concurrent;
using System.Text.Json;
using backend.Infrastructure.Options;
using Microsoft.Extensions.Options;
using StackExchange.Redis;

namespace backend.Infrastructure.Redis;

internal sealed class RedisCacheService(
    IRedisConnectionProvider connectionProvider,
    IOptions<RedisOptions> options,
    IHostEnvironment environment,
    ILogger<RedisCacheService> logger) : ICacheService
{
    private static readonly JsonSerializerOptions SerializerOptions = new(JsonSerializerDefaults.Web);
    private static readonly TimeSpan WarningCooldown = TimeSpan.FromSeconds(30);

    private readonly RedisOptions _options = options.Value;
    private readonly TimeSpan _defaultTtl = TimeSpan.FromSeconds(Math.Clamp(options.Value.DefaultTtlSeconds, 1, 86400));
    private readonly ConcurrentDictionary<string, SemaphoreSlim> _keyLocks = new(StringComparer.OrdinalIgnoreCase);
    private long _nextUnavailableWarningTicks;
    private long _nextOperationWarningTicks;
    private int _unsafePrefixScanLogged;

    public async Task<T?> GetAsync<T>(string key)
    {
        var (isHit, value) = await TryGetAsync<T>(key);
        if (!isHit)
        {
            logger.LogDebug("Cache miss for key {Key}", key);
        }

        return value;
    }

    public async Task SetAsync<T>(string key, T value, TimeSpan ttl)
    {
        var database = await GetDatabaseAsync(nameof(SetAsync), key);
        if (database is null)
        {
            return;
        }

        try
        {
            var payload = JsonSerializer.Serialize(value, SerializerOptions);
            var safeTtl = ttl <= TimeSpan.Zero ? _defaultTtl : ttl;
            await database.StringSetAsync(ToRedisKey(key), payload, safeTtl);
        }
        catch (Exception exception)
        {
            LogOperationFailureThrottled(exception, nameof(SetAsync), key);
        }
    }

    public async Task<T> GetOrSetAsync<T>(string key, Func<Task<T>> factory, TimeSpan ttl)
    {
        var (isHit, cachedValue) = await TryGetAsync<T>(key);
        if (isHit)
        {
            return cachedValue!;
        }

        var redisKey = ToRedisKey(key);
        var keyLock = _keyLocks.GetOrAdd(redisKey, _ => new SemaphoreSlim(1, 1));

        await keyLock.WaitAsync();
        try
        {
            (isHit, cachedValue) = await TryGetAsync<T>(key);
            if (isHit)
            {
                return cachedValue!;
            }

            logger.LogDebug("Cache miss for key {Key}. Loading from source.", key);
            var sourceValue = await factory();

            if (sourceValue is not null)
            {
                await SetAsync(key, sourceValue, ttl);
            }

            return sourceValue;
        }
        finally
        {
            keyLock.Release();
            if (keyLock.CurrentCount == 1)
            {
                _keyLocks.TryRemove(redisKey, out _);
            }
        }
    }

    public async Task RemoveAsync(string key)
    {
        var database = await GetDatabaseAsync(nameof(RemoveAsync), key);
        if (database is null)
        {
            return;
        }

        try
        {
            await database.KeyDeleteAsync(ToRedisKey(key));
        }
        catch (Exception exception)
        {
            LogOperationFailureThrottled(exception, nameof(RemoveAsync), key);
        }
    }

    public async Task RemoveByPrefixAsync(string prefix)
    {
        if (string.IsNullOrWhiteSpace(prefix))
        {
            return;
        }

        if (!_options.Enabled)
        {
            return;
        }

        if (!_options.EnableUnsafePrefixScan || !environment.IsDevelopment())
        {
            if (Interlocked.CompareExchange(ref _unsafePrefixScanLogged, 1, 0) == 0)
            {
                logger.LogWarning(
                    "RemoveByPrefixAsync is disabled by default. Enable Redis:EnableUnsafePrefixScan=true in Development only if required.");
            }

            return;
        }

        var connection = await connectionProvider.GetConnectionAsync();
        if (connection is null || !connection.IsConnected)
        {
            LogRedisUnavailableThrottled(nameof(RemoveByPrefixAsync), prefix);
            return;
        }

        try
        {
            var database = connection.GetDatabase();
            var databaseIndex = database.Database >= 0 ? database.Database : 0;
            var keyPattern = $"{ToRedisKey(prefix)}*";
            long removedCount = 0;

            foreach (var endpoint in connection.GetEndPoints())
            {
                var server = connection.GetServer(endpoint);
                if (!server.IsConnected)
                {
                    continue;
                }

                var keys = server.Keys(databaseIndex, keyPattern, pageSize: 500).ToArray();
                if (keys.Length == 0)
                {
                    continue;
                }

                removedCount += await database.KeyDeleteAsync(keys);
            }

            logger.LogInformation("Removed {Count} keys by prefix {Prefix}.", removedCount, prefix);
        }
        catch (Exception exception)
        {
            LogOperationFailureThrottled(exception, nameof(RemoveByPrefixAsync), prefix);
        }
    }

    [Obsolete("Cache versioning is disabled. This method always returns 1.")]
    public Task<long> GetVersionAsync(string module, string entity)
    {
        logger.LogDebug(
            "Cache versioning is disabled. Returning version=1 for {Module}/{Entity}.",
            module,
            entity);
        return Task.FromResult(1L);
    }

    [Obsolete("Cache versioning is disabled. This method always returns 1.")]
    public Task<long> BumpVersionAsync(string module, string entity)
    {
        logger.LogDebug(
            "Cache versioning is disabled. Returning version=1 for {Module}/{Entity}.",
            module,
            entity);
        return Task.FromResult(1L);
    }

    private async Task<(bool IsHit, T? Value)> TryGetAsync<T>(string key)
    {
        var database = await GetDatabaseAsync(nameof(GetAsync), key);
        if (database is null)
        {
            return (false, default);
        }

        try
        {
            var redisValue = await database.StringGetAsync(ToRedisKey(key));
            if (!redisValue.HasValue)
            {
                return (false, default);
            }

            var payload = redisValue.ToString();
            if (string.IsNullOrWhiteSpace(payload))
            {
                return (false, default);
            }

            var value = JsonSerializer.Deserialize<T>(payload, SerializerOptions);
            return (true, value);
        }
        catch (Exception exception)
        {
            LogOperationFailureThrottled(exception, nameof(GetAsync), key);
            return (false, default);
        }
    }

    private async Task<IDatabase?> GetDatabaseAsync(string operation, string key)
    {
        if (!_options.Enabled)
        {
            return null;
        }

        var connection = await connectionProvider.GetConnectionAsync();
        if (connection is null || !connection.IsConnected)
        {
            LogRedisUnavailableThrottled(operation, key);
            return null;
        }

        return connection.GetDatabase();
    }

    private void LogRedisUnavailableThrottled(string operation, string key)
    {
        if (TryOpenLogWindow(ref _nextUnavailableWarningTicks, WarningCooldown))
        {
            logger.LogWarning(
                "Redis unavailable. Cache fallback for operation {Operation}, key {Key}.",
                operation,
                key);
            return;
        }

        logger.LogDebug(
            "Redis unavailable. Cache fallback for operation {Operation}, key {Key}.",
            operation,
            key);
    }

    private void LogOperationFailureThrottled(Exception exception, string operation, string key)
    {
        if (TryOpenLogWindow(ref _nextOperationWarningTicks, WarningCooldown))
        {
            logger.LogWarning(
                exception,
                "Cache operation {Operation} failed for key {Key}. Request will continue without cache.",
                operation,
                key);
            return;
        }

        logger.LogDebug(
            exception,
            "Cache operation {Operation} failed for key {Key}. Request will continue without cache.",
            operation,
            key);
    }

    private static bool TryOpenLogWindow(ref long nextLogTicks, TimeSpan cooldown)
    {
        while (true)
        {
            var nowTicks = DateTimeOffset.UtcNow.UtcTicks;
            var currentWindowEnd = Interlocked.Read(ref nextLogTicks);
            if (nowTicks < currentWindowEnd)
            {
                return false;
            }

            var nextWindowEnd = nowTicks + cooldown.Ticks;
            if (Interlocked.CompareExchange(ref nextLogTicks, nextWindowEnd, currentWindowEnd) == currentWindowEnd)
            {
                return true;
            }
        }
    }

    private string ToRedisKey(string key)
    {
        var normalizedKey = key.Trim().Trim(':');
        if (string.IsNullOrWhiteSpace(_options.InstancePrefix))
        {
            return normalizedKey;
        }

        var prefix = _options.InstancePrefix.Trim().Trim(':');
        if (normalizedKey.StartsWith($"{prefix}:", StringComparison.OrdinalIgnoreCase))
        {
            return normalizedKey;
        }

        return $"{prefix}:{normalizedKey}";
    }
}
