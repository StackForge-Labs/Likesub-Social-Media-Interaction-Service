namespace backend.Infrastructure.Options;

public sealed class DatabaseOptions
{
    public const string SectionName = "Database";

    public string Provider { get; init; } = "mysql";

    public string ConnectionString { get; init; } = string.Empty;

    public string ServerVersion { get; init; } = "8.0.0";

    public bool EnableSensitiveDataLogging { get; init; } = false;

    public int MaxRetryCount { get; init; } = 5;

    public int MaxRetryDelaySeconds { get; init; } = 5;
}
