using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using social_service.Data.Options;

namespace social_service.Data.Migrations;

public sealed class DatabaseMigrationHostedService : IHostedService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly IOptions<DatabaseOptions> _options;
    private readonly ILogger<DatabaseMigrationHostedService> _logger;

    public DatabaseMigrationHostedService(
        IServiceProvider serviceProvider,
        IOptions<DatabaseOptions> options,
        ILogger<DatabaseMigrationHostedService> logger)
    {
        _serviceProvider = serviceProvider;
        _options = options;
        _logger = logger;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        var dbOptions = _options.Value;

        if (!dbOptions.RunMigrations)
        {
            _logger.LogInformation(
                "Database migrations are disabled. Set {Section}:{Key}=true to enable.",
                DatabaseOptions.SectionName,
                nameof(DatabaseOptions.RunMigrations));
            return;
        }

        try
        {
            using var scope = _serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            _logger.LogInformation("Applying database migrations for provider {Provider}.", dbOptions.Provider);
            await dbContext.Database.MigrateAsync(cancellationToken);
            _logger.LogInformation("Database migrations applied successfully.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Database migration failed.");
            throw;
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}
