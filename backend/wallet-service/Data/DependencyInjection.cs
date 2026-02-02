using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using wallet_service.Data.Migrations;
using wallet_service.Data.Options;

namespace wallet_service.Data;

public static class DependencyInjection
{
    public static IServiceCollection AddData(this IServiceCollection services, IConfiguration configuration, IHostEnvironment environment)
    {
        services.AddOptions<DatabaseOptions>()
            .Bind(configuration.GetSection(DatabaseOptions.SectionName))
            .Validate(HasRequiredSettings, "Database provider and connection string are required.")
            .ValidateOnStart();

        services.AddDbContext<ApplicationDbContext>((sp, options) =>
        {
            var dbOptions = sp.GetRequiredService<IOptions<DatabaseOptions>>().Value;
            ConfigureProvider(options, dbOptions);

            if (dbOptions.EnableSensitiveDataLogging || environment.IsDevelopment())
            {
                options.EnableSensitiveDataLogging();
            }

            if (dbOptions.EnableDetailedErrors || environment.IsDevelopment())
            {
                options.EnableDetailedErrors();
            }
        });

        services.AddHostedService<DatabaseMigrationHostedService>();
        return services;
    }

    private static bool HasRequiredSettings(DatabaseOptions options)
        => !string.IsNullOrWhiteSpace(options.Provider)
           && !string.IsNullOrWhiteSpace(options.ConnectionString);

    private static void ConfigureProvider(DbContextOptionsBuilder options, DatabaseOptions dbOptions)
    {
        var provider = dbOptions.Provider.Trim().ToLowerInvariant();
        var migrationsAssembly = typeof(ApplicationDbContext).Assembly.FullName;

        switch (provider)
        {
            case DatabaseProviders.MySql:
                options.UseMySql(dbOptions.ConnectionString, ServerVersion.AutoDetect(dbOptions.ConnectionString),
                    mysql => mysql.MigrationsAssembly(migrationsAssembly));
                break;
            case DatabaseProviders.PostgreSql:
            case DatabaseProviders.Postgres:
                options.UseNpgsql(dbOptions.ConnectionString,
                    npgsql => npgsql.MigrationsAssembly(migrationsAssembly));
                break;
            default:
                throw new InvalidOperationException($"Unsupported database provider '{dbOptions.Provider}'.");
        }
    }
}
