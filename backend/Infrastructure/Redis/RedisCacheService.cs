using System.Text.Json;
using backend.Infrastructure.Options;
using Microsoft.Extensions.Options;
using StackExchange.Redis;

namespace backend.Infrastructure.Redis;

internal sealed class RedisCacheService(
    IRedisConnectionProvider connectionProvider,
    IOptions<RedisOptions> options,
    ICacheKeyFactory cacheKeyFactory,
    ILogger<RedisCacheService> logger) : ICacheService
{
    private static readonly JsonSerializerOptions SerializerOptions = new(JsonSerializerDefaults.Web);
    private readonly RedisOptions _options = options.Value;
    private readonly TimeSpan _defaultTtl = TimeSpan.FromSeconds(Math.Max(options.Value.DefaultTtlSeconds, 1));

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
            logger.LogWarning(
                exception,
                "Cache SET failed for key {Key}. Request will continue without cache.",
                key);
        }
    }

    public async Task<T> GetOrSetAsync<T>(string key, Func<Task<T>> factory, TimeSpan ttl)
    {
        var (isHit, cachedValue) = await TryGetAsync<T>(key);
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
            logger.LogWarning(
                exception,
                "Cache REMOVE failed for key {Key}. Request will continue without cache.",
                key);
        }
    }

    public async Task RemoveByPrefixAsync(string prefix)
    {
        var connection = await connectionProvider.GetConnectionAsync();
        if (connection is null || !connection.IsConnected)
        {
            logger.LogWarning(
                "Redis unavailable. Skip prefix invalidation for {Prefix}.",
                prefix);
            return;
        }

        try
        {
            var database = connection.GetDatabase(_options.Database);
            var keyPattern = $"{ToRedisKey(prefix)}*";
            long removedCount = 0;

            foreach (var endpoint in connection.GetEndPoints())
            {
                var server = connection.GetServer(endpoint);
                if (!server.IsConnected)
                {
                    continue;
                }

                var keys = server.Keys(_options.Database, keyPattern, pageSize: 500).ToArray();
                if (keys.Length == 0)
                {
                    continue;
                }

                removedCount += await database.KeyDeleteAsync(keys);
            }

            logger.LogInformation(
                "Removed {Count} keys by prefix {Prefix}.",
                removedCount,
                prefix);
        }
        catch (Exception exception)
        {
            logger.LogWarning(
                exception,
                "Prefix invalidation failed for {Prefix}.",
                prefix);
        }
    }

    public async Task<long> GetVersionAsync(string module, string entity)
    {
        var versionKey = cacheKeyFactory.BuildVersionKey(module, entity);
        var database = await GetDatabaseAsync(nameof(GetVersionAsync), versionKey);
        if (database is null)
        {
            return 1;
        }

        try
        {
            var redisKey = ToRedisKey(versionKey);
            var redisValue = await database.StringGetAsync(redisKey);
            if (redisValue.HasValue && long.TryParse(redisValue.ToString(), out var version) && version > 0)
            {
                return version;
            }

            await database.StringSetAsync(redisKey, 1, when: When.NotExists);
            return 1;
        }
        catch (Exception exception)
        {
            logger.LogWarning(
                exception,
                "Version lookup failed for module {Module}, entity {Entity}. Using version 1.",
                module,
                entity);
            return 1;
        }
    }

    public async Task<long> BumpVersionAsync(string module, string entity)
    {
        var versionKey = cacheKeyFactory.BuildVersionKey(module, entity);
        var database = await GetDatabaseAsync(nameof(BumpVersionAsync), versionKey);
        if (database is null)
        {
            return 1;
        }

        try
        {
            var redisKey = ToRedisKey(versionKey);
            var nextVersion = await database.StringIncrementAsync(redisKey);
            return Math.Max((long)nextVersion, 1);
        }
        catch (Exception exception)
        {
            logger.LogWarning(
                exception,
                "Version bump failed for module {Module}, entity {Entity}.",
                module,
                entity);
            return 1;
        }
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
            logger.LogWarning(
                exception,
                "Cache GET failed for key {Key}.",
                key);
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
            logger.LogWarning(
                "Redis unavailable. Cache miss fallback for operation {Operation}, key {Key}.",
                operation,
                key);
            return null;
        }

        return connection.GetDatabase(_options.Database);
    }

    private string ToRedisKey(string key)
    {
        var normalizedKey = key.Trim().Trim(':');
        if (string.IsNullOrWhiteSpace(_options.InstancePrefix))
        {
            return normalizedKey;
        }

        var prefix = _options.InstancePrefix.Trim().Trim(':').ToLowerInvariant();
        if (normalizedKey.StartsWith($"{prefix}:", StringComparison.OrdinalIgnoreCase))
        {
            return normalizedKey.ToLowerInvariant();
        }

        return $"{prefix}:{normalizedKey}".ToLowerInvariant();
    }
}
