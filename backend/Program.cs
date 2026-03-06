using backend.Infrastructure.Database;
using backend.Infrastructure.Cors;
using backend.Infrastructure.Redis;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Diagnostics.HealthChecks;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddEnvironmentVariables();

// Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Infrastructure
builder.Services.AddAppCors(builder.Configuration);
builder.Services.AddCaching(builder.Configuration);
builder.Services.AddDatabase(builder.Configuration);

// Health checks: live vs ready
var redisEnabled = builder.Configuration.GetValue("Redis:Enabled", true);
var redisConnectionString = builder.Configuration["Redis:ConnectionString"];

var healthChecks = builder.Services.AddHealthChecks()
    .AddCheck("self", () => HealthCheckResult.Healthy(), tags: new[] { "live" })
    .AddDbContextCheck<ApplicationDbContext>(
        name: "db",
        failureStatus: HealthStatus.Unhealthy,
        tags: new[] { "ready" })
    .AddCheck<DatabaseMigrationHealthCheck>(
        name: "db-migrations",
        failureStatus: HealthStatus.Unhealthy,
        tags: new[] { "ready" });

if (redisEnabled)
{
    if (!string.IsNullOrWhiteSpace(redisConnectionString))
    {
        healthChecks.AddRedis(
            redisConnectionString: redisConnectionString,
            name: "redis",
            failureStatus: HealthStatus.Unhealthy,
            tags: new[] { "ready" });
    }
    else
    {
        healthChecks.AddCheck(
            name: "redis-config",
            check: () => HealthCheckResult.Unhealthy("Redis is enabled but Redis:ConnectionString is missing."),
            tags: new[] { "ready" });
    }
}
else
{
    healthChecks.AddCheck(
        name: "redis-disabled",
        check: () => HealthCheckResult.Healthy("Redis is disabled."),
        tags: new[] { "ready" });
}

var app = builder.Build();

// Proxy-safe (prod behind reverse proxy)
var useForwardedHeaders = app.Configuration.GetValue("Http:UseForwardedHeaders", !app.Environment.IsDevelopment());
if (useForwardedHeaders)
{
    app.UseForwardedHeaders(new ForwardedHeadersOptions
    {
        ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
    });
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// HTTPS redirection policy
var enforceHttps = app.Configuration.GetValue("Http:EnforceHttps", !app.Environment.IsDevelopment());
if (enforceHttps)
{
    app.UseHttpsRedirection();
}

app.UseAppCors();

app.MapHealthChecks("/health/live", new HealthCheckOptions
{
    Predicate = check => check.Tags.Contains("live"),
});
app.MapHealthChecks("/health/ready", new HealthCheckOptions
{
    Predicate = check => check.Tags.Contains("ready"),
});

app.MapControllers();

// Migration modes
var migrateOnly = args.Any(a => a.Equals("--migrate-only", StringComparison.OrdinalIgnoreCase));
var migrateAndRun = args.Any(a => a.Equals("--migrate", StringComparison.OrdinalIgnoreCase));

var shouldRunMigrations =
    app.Environment.IsDevelopment() || migrateOnly || migrateAndRun;

// Run migrations based on startup mode (with lock + retry).
app.ApplyMigrationsIfNeeded(shouldRunMigrations, throwOnFailure: migrateOnly);

if (migrateOnly)
{
    return;
}

app.Run();
