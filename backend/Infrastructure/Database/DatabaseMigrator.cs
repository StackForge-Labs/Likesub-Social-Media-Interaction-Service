using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace backend.Infrastructure.Database;

public static class DatabaseMigrator
{
    public static void ApplyMigrationsIfNeeded(
        this IHost host,
        bool shouldRun,
        bool throwOnFailure = false)
    {
        using var scope = host.Services.CreateScope();
        var migrationState = scope.ServiceProvider.GetRequiredService<DatabaseMigrationState>();

        if (!shouldRun)
        {
            migrationState.MarkNotAttempted();
            return;
        }

        var logger = scope.ServiceProvider
            .GetRequiredService<ILoggerFactory>()
            .CreateLogger("DatabaseMigrator");
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        const string lockName = "backend_db_migration_lock";
        var lockAcquired = false;
        var openedMigrationConnection = false;

        try
        {
            WaitForDatabase(db, logger);
            openedMigrationConnection = TryOpenMigrationConnection(db);

            lockAcquired = TryAcquireMySqlLock(db, lockName, timeoutSeconds: 30, logger);
            if (!lockAcquired)
            {
                logger.LogWarning("Could not acquire migration lock. Skipping migrations on this instance.");
                migrationState.MarkHealthy();
                return;
            }

            var hasPendingMigrations = db.Database.GetPendingMigrations().Any();
            if (!hasPendingMigrations)
            {
                logger.LogInformation("No pending migrations. Database is up to date.");
                migrationState.MarkHealthy();
                return;
            }

            logger.LogInformation("Pending migrations found. Applying migrations...");
            db.Database.Migrate();
            logger.LogInformation("Database migrations applied successfully.");
            migrationState.MarkHealthy();
        }
        catch (Exception exception)
        {
            migrationState.MarkUnhealthy(exception);
            logger.LogError(
                exception,
                "Database migration failed. Application will keep running, but readiness should fail until issue is resolved.");

            if (throwOnFailure)
            {
                throw;
            }
        }
        finally
        {
            if (lockAcquired)
            {
                ReleaseMySqlLock(db, lockName, logger);
            }

            if (openedMigrationConnection)
            {
                TryCloseMigrationConnection(db, logger);
            }
        }
    }

    private static void WaitForDatabase(ApplicationDbContext db, ILogger logger)
    {
        const int maxAttempts = 10;
        for (var attempt = 1; attempt <= maxAttempts; attempt++)
        {
            try
            {
                if (db.Database.CanConnect())
                {
                    logger.LogInformation("Database connection established.");
                    return;
                }
            }
            catch (Exception ex)
            {
                logger.LogWarning(ex, "Database not ready (attempt {Attempt}/{Max}).", attempt, maxAttempts);
            }

            Thread.Sleep(TimeSpan.FromSeconds(Math.Min(2 * attempt, 10)));
        }

        throw new InvalidOperationException("Database is not reachable after multiple attempts.");
    }

    private static bool TryAcquireMySqlLock(
        ApplicationDbContext db,
        string lockName,
        int timeoutSeconds,
        ILogger logger)
    {
        var conn = db.Database.GetDbConnection();

        using var cmd = conn.CreateCommand();
        cmd.CommandText = "SELECT GET_LOCK(@name, @timeout);";

        var p1 = cmd.CreateParameter();
        p1.ParameterName = "@name";
        p1.Value = lockName;
        cmd.Parameters.Add(p1);

        var p2 = cmd.CreateParameter();
        p2.ParameterName = "@timeout";
        p2.Value = timeoutSeconds;
        cmd.Parameters.Add(p2);

        var result = cmd.ExecuteScalar();
        var acquired = result is not null && Convert.ToInt32(result) == 1;

        logger.LogInformation("Migration lock acquire result: {Acquired}", acquired);
        return acquired;
    }

    private static void ReleaseMySqlLock(ApplicationDbContext db, string lockName, ILogger logger)
    {
        try
        {
            var conn = db.Database.GetDbConnection();

            using var cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT RELEASE_LOCK(@name);";

            var p1 = cmd.CreateParameter();
            p1.ParameterName = "@name";
            p1.Value = lockName;
            cmd.Parameters.Add(p1);

            cmd.ExecuteScalar();
            logger.LogInformation("Migration lock released.");
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Failed to release migration lock.");
        }
    }

    private static bool TryOpenMigrationConnection(ApplicationDbContext db)
    {
        var conn = db.Database.GetDbConnection();
        if (conn.State == System.Data.ConnectionState.Open)
        {
            return false;
        }

        conn.Open();
        return true;
    }

    private static void TryCloseMigrationConnection(ApplicationDbContext db, ILogger logger)
    {
        try
        {
            var conn = db.Database.GetDbConnection();
            if (conn.State != System.Data.ConnectionState.Closed)
            {
                conn.Close();
            }
        }
        catch (Exception exception)
        {
            logger.LogDebug(exception, "Failed to close migration connection cleanly.");
        }
    }
}
