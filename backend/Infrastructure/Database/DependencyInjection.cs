using backend.Infrastructure.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace backend.Infrastructure.Database;

public static class DependencyInjection
{
    private const int DefaultCommandTimeoutSeconds = 30;
    private const int DefaultRetryCount = 5;
    private const int DefaultRetryDelaySeconds = 5;
    private static readonly object ServerVersionLock = new();
    private static ServerVersion? _cachedAutoDetectedServerVersion;
    private static string? _cachedAutoDetectedConnectionString;

    public static IServiceCollection AddDatabase(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddOptions<DatabaseOptions>()
            .Bind(configuration.GetSection(DatabaseOptions.SectionName))
            .ValidateDataAnnotations()
            .Validate(o => !string.IsNullOrWhiteSpace(o.ConnectionString),
                $"{DatabaseOptions.SectionName}:ConnectionString is required.")
            .ValidateOnStart();

        services.AddSingleton<DatabaseMigrationState>();

        services.AddDbContext<ApplicationDbContext>((sp, options) =>
        {
            var env = sp.GetRequiredService<IHostEnvironment>();
            var db = sp.GetRequiredService<IOptions<DatabaseOptions>>().Value;
            var logger = sp.GetRequiredService<ILoggerFactory>().CreateLogger("DatabaseConfiguration");

            ConfigureDbContext(options, db, env, logger);
        });

        return services;
    }

    private static void ConfigureDbContext(
        DbContextOptionsBuilder options,
        DatabaseOptions db,
        IHostEnvironment env,
        ILogger logger)
    {
        ConfigureMySql(options, db, env, logger);

        if (env.IsDevelopment())
        {
            options.EnableSensitiveDataLogging();
            options.EnableDetailedErrors();
        }
    }

    private static void ConfigureMySql(
        DbContextOptionsBuilder options,
        DatabaseOptions db,
        IHostEnvironment env,
        ILogger logger)
    {
        var serverVersion = ResolveServerVersion(db, env, logger);
        var commandTimeout = DefaultCommandTimeoutSeconds;
        var retryCount = DefaultRetryCount;
        var retryDelay = TimeSpan.FromSeconds(DefaultRetryDelaySeconds);

        options.UseMySql(
            db.ConnectionString,
            serverVersion,
            mySql =>
            {
                mySql.CommandTimeout(commandTimeout);

                if (retryCount > 0)
                {
                    mySql.EnableRetryOnFailure(
                        maxRetryCount: retryCount,
                        maxRetryDelay: retryDelay,
                        errorNumbersToAdd: null);
                }
            });
    }

    private static ServerVersion ResolveServerVersion(
        DatabaseOptions db,
        IHostEnvironment env,
        ILogger logger)
    {
        if (!string.IsNullOrWhiteSpace(db.ServerVersion))
        {
            return ServerVersion.Parse(db.ServerVersion);
        }

        lock (ServerVersionLock)
        {
            if (_cachedAutoDetectedServerVersion is not null &&
                string.Equals(
                    _cachedAutoDetectedConnectionString,
                    db.ConnectionString,
                    StringComparison.Ordinal))
            {
                return _cachedAutoDetectedServerVersion;
            }

            try
            {
                var detectedServerVersion = ServerVersion.AutoDetect(db.ConnectionString);
                _cachedAutoDetectedServerVersion = detectedServerVersion;
                _cachedAutoDetectedConnectionString = db.ConnectionString;

                if (!env.IsDevelopment())
                {
                    logger.LogWarning(
                        "{Section}:ServerVersion is not set. Auto-detected MySQL server version {Version}. Configure explicit ServerVersion for stable startup.",
                        DatabaseOptions.SectionName,
                        detectedServerVersion);
                }

                return detectedServerVersion;
            }
            catch (Exception exception)
            {
                throw new InvalidOperationException(
                    $"{DatabaseOptions.SectionName}:ServerVersion could not be auto-detected. Configure Database:ServerVersion explicitly.",
                    exception);
            }
        }
    }
}
