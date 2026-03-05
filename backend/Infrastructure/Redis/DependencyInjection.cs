using backend.Infrastructure.Options;

namespace backend.Infrastructure.Redis;

public static class DependencyInjection
{
    public static IServiceCollection AddCaching(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddOptions<RedisOptions>()
            .Bind(configuration.GetSection(RedisOptions.SectionName))
            .Validate(
                options => !options.Enabled || !string.IsNullOrWhiteSpace(options.ConnectionString),
                "Redis:ConnectionString is required when Redis is enabled.")
            .Validate(
                options => options.DefaultTtlSeconds is > 0 and <= 86400,
                "Redis:DefaultTtlSeconds must be between 1 and 86400.")
            .ValidateOnStart();

        services.AddSingleton<ICacheKeyFactory, CacheKeyFactory>();
        services.AddSingleton<IRedisConnectionProvider, RedisConnectionProvider>();
        services.AddSingleton<ICacheService, RedisCacheService>();

        return services;
    }
}
