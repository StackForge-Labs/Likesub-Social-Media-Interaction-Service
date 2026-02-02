namespace wallet_service.Data.Options;

public sealed class DatabaseOptions
{
    public const string SectionName = "Database";

    public string Provider { get; set; } = "mysql";
    public string ConnectionString { get; set; } = string.Empty;
    public bool RunMigrations { get; set; }
    public bool EnableSensitiveDataLogging { get; set; }
    public bool EnableDetailedErrors { get; set; }
}
