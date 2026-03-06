using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace backend.Infrastructure.Database;

public sealed class DatabaseMigrationHealthCheck(DatabaseMigrationState migrationState) : IHealthCheck
{
    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        var snapshot = migrationState.GetSnapshot();
        if (!snapshot.WasAttempted || snapshot.IsHealthy)
        {
            return Task.FromResult(HealthCheckResult.Healthy("Database migration status is healthy."));
        }

        return Task.FromResult(
            new HealthCheckResult(
                status: context.Registration.FailureStatus,
                description: $"Database migrations failed: {snapshot.LastError ?? "unknown error"}"));
    }
}
