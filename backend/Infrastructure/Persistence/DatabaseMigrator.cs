using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace backend.Infrastructure.Persistence;

public static class DatabaseMigrator
{
    public static void ApplyMigrationsIfNeeded(this IHost host, bool shouldRun)
    {
        if (!shouldRun)
        {
            return;
        }

        using var scope = host.Services.CreateScope();
        var logger = scope.ServiceProvider
            .GetRequiredService<ILoggerFactory>()
            .CreateLogger("DatabaseMigrator");
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        //kiểm tra sự thay đổi database
        var hasPendingMigrations = db.Database.GetPendingMigrations().Any();

        if (!hasPendingMigrations)
        {
            logger.LogInformation("No pending migrations. Database is up to date.");
            return;
        }

        logger.LogInformation("Pending migrations found. Applying migrations...");
        db.Database.Migrate();
        logger.LogInformation("Database migrations applied successfully.");
    }
}
