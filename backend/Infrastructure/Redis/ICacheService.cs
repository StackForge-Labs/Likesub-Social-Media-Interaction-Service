namespace backend.Infrastructure.Redis;

public interface ICacheService
{
    Task<T?> GetAsync<T>(string key);

    Task SetAsync<T>(string key, T value, TimeSpan ttl);

    Task<T> GetOrSetAsync<T>(string key, Func<Task<T>> factory, TimeSpan ttl);

    Task RemoveAsync(string key);

    Task RemoveByPrefixAsync(string prefix);

    Task<long> GetVersionAsync(string module, string entity);

    Task<long> BumpVersionAsync(string module, string entity);
}
