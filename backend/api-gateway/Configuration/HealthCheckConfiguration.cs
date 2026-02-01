namespace api_gateway.Configuration;

public static class HealthCheckConfiguration
{
    public static IServiceCollection AddHealthCheckServices(
    this IServiceCollection services,
    IConfiguration configuration,
    IWebHostEnvironment env)
    {
        var userServiceUrl = configuration["Services:User:BaseUrl"];
        var socialServiceUrl = configuration["Services:Social:BaseUrl"];
        var walletServiceUrl = configuration["Services:Wallet:BaseUrl"];

        services.AddHealthChecks()
            .AddUrlGroup(new Uri($"{userServiceUrl}/health"), "user-service")
            .AddUrlGroup(new Uri($"{socialServiceUrl}/health"), "social-service")
            .AddUrlGroup(new Uri($"{walletServiceUrl}/health"), "wallet-service");

        return services;
    }

}
