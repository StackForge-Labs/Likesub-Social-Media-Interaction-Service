using backend.Infrastructure.Options;
using Microsoft.Extensions.Options;
using StackExchange.Redis;

namespace backend.Infrastructure.Redis;

internal interface IRedisConnectionProvider
{
    Task<IConnectionMultiplexer?> GetConnectionAsync();
}

internal sealed class RedisConnectionProvider(
    IOptions<RedisOptions> options,
    ILogger<RedisConnectionProvider> logger) : IRedisConnectionProvider, IAsyncDisposable
{
    private static readonly TimeSpan WarningCooldown = TimeSpan.FromSeconds(30);
    private readonly RedisOptions _options = options.Value;
    private readonly SemaphoreSlim _connectionLock = new(1, 1);
    private IConnectionMultiplexer? _connection;
    private long _nextWarningLogTicks;

    public async Task<IConnectionMultiplexer?> GetConnectionAsync()
    {
        if (!_options.Enabled)
        {
            return null;
        }

        if (_connection is { IsConnected: true })
        {
            return _connection;
        }

        await _connectionLock.WaitAsync();
        try
        {
            if (_connection is { IsConnected: true })
            {
                return _connection;
            }

            if (_connection is not null)
            {
                _connection.ConnectionFailed -= OnConnectionFailed;
                _connection.ConnectionRestored -= OnConnectionRestored;
                await _connection.CloseAsync();
                _connection.Dispose();
                _connection = null;
            }

            var configuration = BuildConfigurationOptions();

            _connection = await ConnectionMultiplexer.ConnectAsync(configuration);
            _connection.ConnectionFailed += OnConnectionFailed;
            _connection.ConnectionRestored += OnConnectionRestored;

            logger.LogInformation(
                "Redis connection established. Endpoints: {Endpoints}",
                string.Join(", ", configuration.EndPoints.Select(endpoint => endpoint.ToString())));
            return _connection;
        }
        catch (Exception exception)
        {
            LogWarningThrottled(
                exception,
                "Could not connect to Redis. Cache operations will fall back to source.");
            return null;
        }
        finally
        {
            _connectionLock.Release();
        }
    }

    private ConfigurationOptions BuildConfigurationOptions()
    {
        var configuration = ConfigurationOptions.Parse(_options.ConnectionString, ignoreUnknown: true);

        configuration.AbortOnConnectFail = false;
        configuration.AllowAdmin = false;
        configuration.ConnectRetry = Math.Clamp(configuration.ConnectRetry <= 0 ? 2 : configuration.ConnectRetry, 1, 5);
        configuration.ConnectTimeout = Math.Clamp(configuration.ConnectTimeout <= 0 ? 5000 : configuration.ConnectTimeout, 1000, 15000);
        configuration.SyncTimeout = Math.Clamp(configuration.SyncTimeout <= 0 ? 5000 : configuration.SyncTimeout, 1000, 15000);
        configuration.KeepAlive = Math.Clamp(configuration.KeepAlive <= 0 ? 60 : configuration.KeepAlive, 15, 300);
        configuration.ReconnectRetryPolicy ??= new ExponentialRetry(5000);

        return configuration;
    }

    private void OnConnectionFailed(object? sender, ConnectionFailedEventArgs args)
    {
        LogWarningThrottled(
            args.Exception,
            "Redis connection failed. Endpoint: {Endpoint}, FailureType: {FailureType}",
            args.EndPoint?.ToString(),
            args.FailureType);
    }

    private void OnConnectionRestored(object? sender, ConnectionFailedEventArgs args)
    {
        logger.LogInformation(
            "Redis connection restored. Endpoint: {Endpoint}, FailureType: {FailureType}",
            args.EndPoint?.ToString(),
            args.FailureType);
    }

    private void LogWarningThrottled(
        Exception? exception,
        string messageTemplate,
        params object?[] args)
    {
        if (TryOpenLogWindow(ref _nextWarningLogTicks, WarningCooldown))
        {
            logger.LogWarning(exception, messageTemplate, args);
            return;
        }

        logger.LogDebug(exception, messageTemplate, args);
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

    public async ValueTask DisposeAsync()
    {
        if (_connection is not null)
        {
            _connection.ConnectionFailed -= OnConnectionFailed;
            _connection.ConnectionRestored -= OnConnectionRestored;
            await _connection.CloseAsync();
            _connection.Dispose();
            _connection = null;
        }

        _connectionLock.Dispose();
    }
}
