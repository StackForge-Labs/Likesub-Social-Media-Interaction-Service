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
    private readonly RedisOptions _options = options.Value;
    private readonly SemaphoreSlim _connectionLock = new(1, 1);
    private IConnectionMultiplexer? _connection;

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

            var configuration = new ConfigurationOptions
            {
                AbortOnConnectFail = _options.AbortOnConnectFail,
                AllowAdmin = _options.AllowAdmin,
                ConnectRetry = Math.Clamp(_options.ConnectRetry, 0, 10),
                ConnectTimeout = Math.Clamp(_options.ConnectTimeoutMs, 1000, 60000),
                SyncTimeout = Math.Clamp(_options.SyncTimeoutMs, 1000, 60000),
                Password = string.IsNullOrWhiteSpace(_options.Password)
                    ? null
                    : _options.Password,
                Ssl = _options.Ssl,
            };
            configuration.EndPoints.Add(_options.Host, Math.Clamp(_options.Port, 1, 65535));

            _connection = await ConnectionMultiplexer.ConnectAsync(configuration);
            _connection.ConnectionFailed += (_, args) =>
                logger.LogWarning(
                    args.Exception,
                    "Redis connection failed. Endpoint: {Endpoint}, FailureType: {FailureType}",
                    args.EndPoint?.ToString(),
                    args.FailureType);
            _connection.ConnectionRestored += (_, args) =>
                logger.LogInformation(
                    "Redis connection restored. Endpoint: {Endpoint}, FailureType: {FailureType}",
                    args.EndPoint?.ToString(),
                    args.FailureType);

            logger.LogInformation("Redis connection established to {Host}:{Port}", _options.Host, _options.Port);
            return _connection;
        }
        catch (Exception exception)
        {
            logger.LogWarning(
                exception,
                "Could not connect to Redis at {Host}:{Port}. Cache operations will fall back to source.",
                _options.Host,
                _options.Port);
            return null;
        }
        finally
        {
            _connectionLock.Release();
        }
    }

    public async ValueTask DisposeAsync()
    {
        if (_connection is not null)
        {
            await _connection.CloseAsync();
            _connection.Dispose();
        }

        _connectionLock.Dispose();
    }
}
