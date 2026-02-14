using backend.Infrastructure.Database;
using backend.Infrastructure.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCaching(builder.Configuration);
builder.Services.AddDatabase(builder.Configuration);

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.MapControllers();

var shouldRunMigrations = app.Environment.IsDevelopment()
    || args.Any(arg => string.Equals(arg, "--migration", StringComparison.OrdinalIgnoreCase));

app.ApplyMigrationsIfNeeded(shouldRunMigrations);

app.Run();
