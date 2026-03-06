namespace backend.Infrastructure.Options;

public sealed class RedisOptions
{
    public const string SectionName = "Redis";

    public bool Enabled { get; init; } = true;

    public string ConnectionString { get; init; } = string.Empty;

    public string InstancePrefix { get; init; } = "likesub:prod";

    public int DefaultTtlSeconds { get; init; } = 300;

    public bool EnableUnsafePrefixScan { get; init; } = false;
}
