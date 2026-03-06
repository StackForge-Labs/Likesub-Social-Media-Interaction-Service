namespace backend.Infrastructure.Redis;

public interface ICacheService
{
    Task<T?> GetAsync<T>(string key);

    Task SetAsync<T>(string key, T value, TimeSpan ttl);

    Task<T> GetOrSetAsync<T>(string key, Func<Task<T>> factory, TimeSpan ttl);

    Task RemoveAsync(string key);

    Task RemoveByPrefixAsync(string prefix);

    [Obsolete("Cache versioning is disabled. This method always returns 1.")]
    Task<long> GetVersionAsync(string module, string entity);

    [Obsolete("Cache versioning is disabled. This method always returns 1.")]
    Task<long> BumpVersionAsync(string module, string entity);
}
