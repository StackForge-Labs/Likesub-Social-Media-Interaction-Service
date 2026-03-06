using System.Security.Cryptography;
using System.Text;

namespace backend.Infrastructure.Redis;

public sealed class CacheKeyFactory : ICacheKeyFactory
{
    public string BuildKey(string module, string entity, string scope, string hash)
    {
        return string.Join(
            ":",
            NormalizeToken(module),
            NormalizeToken(entity),
            NormalizeToken(scope),
            NormalizeHash(hash));
    }

    public string BuildDetailKey(string module, string entity, string id)
    {
        return BuildKey(module, entity, "detail", id);
    }

    public string BuildListKey(
        string module,
        string entity,
        IReadOnlyDictionary<string, string?> queryParameters)
    {
        var canonicalQuery = string.Join(
            "&",
            queryParameters
                .OrderBy(pair => pair.Key, StringComparer.Ordinal)
                .Select(pair => $"{pair.Key.Trim()}={pair.Value?.Trim() ?? string.Empty}"));

        return BuildListKey(module, entity, canonicalQuery);
    }

    public string BuildListKey(string module, string entity, string rawQuery)
    {
        return BuildKey(module, entity, "list", ComputeHash(rawQuery));
    }

    [Obsolete("Cache versioning is disabled.")]
    public string BuildVersionKey(string module, string entity)
    {
        return string.Join(":", NormalizeToken(module), NormalizeToken(entity), "version");
    }

    [Obsolete("Cache versioning is disabled.")]
    public string BuildVersionedKey(string module, string entity, long version, string scope, string hash)
    {
        return string.Join(
            ":",
            NormalizeToken(module),
            NormalizeToken(entity),
            $"v{Math.Max(version, 1)}",
            NormalizeToken(scope),
            NormalizeHash(hash));
    }

    private static string NormalizeToken(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return "na";
        }

        var normalized = value.Trim().ToLowerInvariant();
        var builder = new StringBuilder(normalized.Length);

        foreach (var character in normalized)
        {
            if (char.IsLetterOrDigit(character) || character is '-' or '_')
            {
                builder.Append(character);
                continue;
            }

            builder.Append('-');
        }

        return builder.ToString().Trim('-');
    }

    private static string NormalizeHash(string hash)
    {
        if (string.IsNullOrWhiteSpace(hash))
        {
            return "na";
        }

        var trimmed = hash.Trim();
        if (trimmed.Length <= 64 && trimmed.All(character => char.IsLetterOrDigit(character) || character is '-' or '_' or '='))
        {
            return trimmed.ToLowerInvariant();
        }

        return ComputeHash(trimmed);
    }

    private static string ComputeHash(string input)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(input ?? string.Empty));
        return Convert.ToHexString(bytes).ToLowerInvariant()[..16];
    }
}
