namespace api_gateway.Configuration;

public static class HealthCheckConfiguration
{
    public static IServiceCollection AddHealthCheckServices(
    this IServiceCollection services,
    IConfiguration configuration,
    IHostEnvironment env)
    {
        var userServiceUrl = configuration["Services:User:BaseUrl"];
        var socialServiceUrl = configuration["Services:Social:BaseUrl"];
        var walletServiceUrl = configuration["Services:Wallet:BaseUrl"];

        var healthChecks = services.AddHealthChecks();

        if (env.IsDevelopment())
            return services;

        if (string.IsNullOrWhiteSpace(userServiceUrl) ||
            string.IsNullOrWhiteSpace(socialServiceUrl) ||
            string.IsNullOrWhiteSpace(walletServiceUrl))
        {
            throw new InvalidOperationException(
                "Service base URLs are not configured for health checks.");
        }

        healthChecks
            .AddUrlGroup(new Uri($"{userServiceUrl}/health"), "user-service")
            .AddUrlGroup(new Uri($"{socialServiceUrl}/health"), "social-service")
            .AddUrlGroup(new Uri($"{walletServiceUrl}/health"), "wallet-service");

        return services;
    }


}
