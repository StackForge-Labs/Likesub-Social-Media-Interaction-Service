using backend.Infrastructure.Database;
using backend.Infrastructure.Redis;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Extensions.Diagnostics.HealthChecks;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();
// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks()
    .AddCheck(
        "self",
        () => HealthCheckResult.Healthy(),
        tags: new[] { "live", "ready" });

builder.Services.AddCaching(builder.Configuration);
builder.Services.AddDatabase(builder.Configuration);

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var enforceHttps = app.Configuration.GetValue("Http:EnforceHttps", !app.Environment.IsDevelopment());
if (enforceHttps)
{
    app.UseHttpsRedirection();
}

app.MapHealthChecks(
    "/health/live",
    new HealthCheckOptions
    {
        Predicate = check => check.Tags.Contains("live"),
    });
app.MapHealthChecks(
    "/health/ready",
    new HealthCheckOptions
    {
        Predicate = check => check.Tags.Contains("ready"),
    });
app.MapControllers();

var shouldRunMigrations = app.Environment.IsDevelopment()
    || args.Any(arg => string.Equals(arg, "--migration", StringComparison.OrdinalIgnoreCase));

app.ApplyMigrationsIfNeeded(shouldRunMigrations);

app.Run();
