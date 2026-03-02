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
                options => !options.Enabled || !string.IsNullOrWhiteSpace(options.Host),
                "Redis:Host is required when Redis is enabled.")
            .Validate(
                options => !options.Enabled || options.Port is > 0 and <= 65535,
                "Redis:Port must be in range 1..65535 when Redis is enabled.")
            .ValidateOnStart();

        services.AddSingleton<ICacheKeyFactory, CacheKeyFactory>();
        services.AddSingleton<IRedisConnectionProvider, RedisConnectionProvider>();
        services.AddSingleton<ICacheService, RedisCacheService>();

        return services;
    }
}
