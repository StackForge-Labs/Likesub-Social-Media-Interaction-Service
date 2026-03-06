namespace backend.Infrastructure.Options;

public sealed class CorsOptions
{
    public const string SectionName = "Cors";

    public bool Enabled { get; init; } = false;

    public string PolicyName { get; init; } = "AppCors";

    public string[] AllowedOrigins { get; init; } = Array.Empty<string>();

    public string[] AllowedMethods { get; init; } =
    [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS",
    ];

    public string[] AllowedHeaders { get; init; } = ["*"];

    public string[] ExposedHeaders { get; init; } = Array.Empty<string>();

    public bool AllowCredentials { get; init; } = true;

    public int PreflightMaxAgeSeconds { get; init; } = 600;
}
