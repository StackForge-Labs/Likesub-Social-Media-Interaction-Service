using backend.Infrastructure.Options;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Persistence;

public static class DependencyInjection
{
    public static IServiceCollection AddPersistence(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddOptions<DatabaseOptions>()
            .Bind(configuration.GetSection(DatabaseOptions.SectionName))
            .Validate(
                options => !string.IsNullOrWhiteSpace(options.ConnectionString),
                "Database:ConnectionString is required.")
            .ValidateOnStart();

        var dbOptions = configuration.GetSection(DatabaseOptions.SectionName).Get<DatabaseOptions>()
            ?? new DatabaseOptions();

        services.AddDbContext<ApplicationDbContext>(options =>
        {
            var provider = dbOptions.Provider?.Trim().ToLowerInvariant();
            if (!string.IsNullOrWhiteSpace(provider) && provider != "mysql")
            {
                throw new InvalidOperationException(
                    $"Unsupported database provider '{dbOptions.Provider}'. " +
                    "Currently only mysql is supported.");
            }

            var serverVersion = string.IsNullOrWhiteSpace(dbOptions.ServerVersion)
                ? "8.0.0"
                : dbOptions.ServerVersion;

            options.UseMySql(
                dbOptions.ConnectionString,
                ServerVersion.Parse(serverVersion),
                mySqlOptions =>
                {
                    var delay = TimeSpan.FromSeconds(
                        Math.Clamp(dbOptions.MaxRetryDelaySeconds, 1, 60));
                    mySqlOptions.EnableRetryOnFailure(
                        maxRetryCount: Math.Clamp(dbOptions.MaxRetryCount, 1, 10),
                        maxRetryDelay: delay,
                        errorNumbersToAdd: null);
                });

            if (dbOptions.EnableSensitiveDataLogging)
            {
                options.EnableSensitiveDataLogging();
            }
        });

        return services;
    }
}
