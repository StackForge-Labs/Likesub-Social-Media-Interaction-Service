namespace backend.Infrastructure.Options;

public sealed class RedisOptions
{
    public const string SectionName = "Redis";

    public bool Enabled { get; init; } = true;

    public string Host { get; init; } = "redis";

    public int Port { get; init; } = 6379;

    public string Password { get; init; } = string.Empty;

    public int Database { get; init; } = 0;

    public string InstancePrefix { get; init; } = "likesub:prod";

    public int DefaultTtlSeconds { get; init; } = 300;

    public int ConnectTimeoutMs { get; init; } = 5000;

    public int SyncTimeoutMs { get; init; } = 5000;

    public int ConnectRetry { get; init; } = 3;

    public bool AbortOnConnectFail { get; init; } = false;

    public bool AllowAdmin { get; init; } = true;

    public bool Ssl { get; init; } = false;
}
