namespace backend.Infrastructure.Redis;

public interface ICacheKeyFactory
{
    string BuildKey(string module, string entity, string scope, string hash);

    string BuildDetailKey(string module, string entity, string id);

    string BuildListKey(string module, string entity, IReadOnlyDictionary<string, string?> queryParameters);

    string BuildListKey(string module, string entity, string rawQuery);

    [Obsolete("Cache versioning is disabled.")]
    string BuildVersionKey(string module, string entity);

    [Obsolete("Cache versioning is disabled.")]
    string BuildVersionedKey(string module, string entity, long version, string scope, string hash);
}
