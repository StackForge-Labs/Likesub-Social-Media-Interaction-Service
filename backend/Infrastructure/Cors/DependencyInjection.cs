using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.Extensions.Options;
using AppCorsOptions = backend.Infrastructure.Options.CorsOptions;
using FrameworkCorsOptions = Microsoft.AspNetCore.Cors.Infrastructure.CorsOptions;

namespace backend.Infrastructure.Cors;

public static class DependencyInjection
{
    public static IServiceCollection AddAppCors(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddOptions<AppCorsOptions>()
            .Bind(configuration.GetSection(AppCorsOptions.SectionName))
            .Validate(
                options => !options.Enabled || Normalize(options.AllowedOrigins).Length > 0,
                "Cors:AllowedOrigins must contain at least one origin when Cors is enabled.")
            .Validate(
                options => options.PreflightMaxAgeSeconds is >= 0 and <= 86400,
                "Cors:PreflightMaxAgeSeconds must be between 0 and 86400.")
            .Validate(
                options => !options.AllowCredentials || !ContainsWildcardOrigin(options.AllowedOrigins),
                "Cors:AllowCredentials cannot be true when Cors:AllowedOrigins contains '*'.")
            .ValidateOnStart();

        services.AddTransient<IConfigureOptions<FrameworkCorsOptions>, CorsPolicyConfigurator>();
        services.AddCors();

        return services;
    }

    public static IApplicationBuilder UseAppCors(this IApplicationBuilder app)
    {
        var options = app.ApplicationServices.GetRequiredService<IOptions<AppCorsOptions>>().Value;
        if (!options.Enabled)
        {
            return app;
        }

        return app.UseCors(options.PolicyName);
    }

    private static void ConfigureOrigins(CorsPolicyBuilder policy, AppCorsOptions options)
    {
        var origins = Normalize(options.AllowedOrigins);
        if (ContainsWildcardOrigin(origins))
        {
            policy.AllowAnyOrigin();
            return;
        }

        policy.WithOrigins(origins);
    }

    private static void ConfigureMethods(CorsPolicyBuilder policy, AppCorsOptions options)
    {
        var methods = Normalize(options.AllowedMethods);
        if (ContainsWildcard(methods))
        {
            policy.AllowAnyMethod();
            return;
        }

        policy.WithMethods(methods);
    }

    private static void ConfigureHeaders(CorsPolicyBuilder policy, AppCorsOptions options)
    {
        var headers = Normalize(options.AllowedHeaders);
        if (ContainsWildcard(headers))
        {
            policy.AllowAnyHeader();
            return;
        }

        policy.WithHeaders(headers);
    }

    private static void ConfigureExposedHeaders(CorsPolicyBuilder policy, AppCorsOptions options)
    {
        var exposedHeaders = Normalize(options.ExposedHeaders);
        if (exposedHeaders.Length == 0)
        {
            return;
        }

        if (ContainsWildcard(exposedHeaders))
        {
            return;
        }

        policy.WithExposedHeaders(exposedHeaders);
    }

    private static bool ContainsWildcardOrigin(IEnumerable<string>? values)
    {
        return values is not null &&
               values.Any(value => string.Equals(value?.Trim(), "*", StringComparison.Ordinal));
    }

    private static bool ContainsWildcard(IEnumerable<string>? values)
    {
        return values is not null &&
               values.Any(value => string.Equals(value?.Trim(), "*", StringComparison.Ordinal));
    }

    private static string[] Normalize(IEnumerable<string>? values)
    {
        return values is null
            ? Array.Empty<string>()
            : values
                .Where(value => !string.IsNullOrWhiteSpace(value))
                .Select(value => value.Trim())
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .ToArray();
    }

    private sealed class CorsPolicyConfigurator(IOptions<AppCorsOptions> optionsAccessor)
        : IConfigureOptions<FrameworkCorsOptions>
    {
        public void Configure(FrameworkCorsOptions corsOptions)
        {
            var options = optionsAccessor.Value;
            if (!options.Enabled)
            {
                return;
            }

            corsOptions.AddPolicy(options.PolicyName, policy =>
            {
                ConfigureOrigins(policy, options);
                ConfigureMethods(policy, options);
                ConfigureHeaders(policy, options);
                ConfigureExposedHeaders(policy, options);

                if (options.AllowCredentials)
                {
                    policy.AllowCredentials();
                }

                if (options.PreflightMaxAgeSeconds > 0)
                {
                    policy.SetPreflightMaxAge(TimeSpan.FromSeconds(options.PreflightMaxAgeSeconds));
                }
            });
        }
    }
}
