using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace backend.Infrastructure.Persistence;

public static class DatabaseMigrator
{
    public static void ApplyMigrationsIfNeeded(
        this IHost host,
        bool shouldRun)
    {
        if (!shouldRun)
        {
            return;
        }

        using var scope = host.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        db.Database.Migrate();
    }
}
