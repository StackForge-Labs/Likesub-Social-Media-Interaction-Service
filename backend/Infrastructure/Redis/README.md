# Infrastructure/Redis

**Purpose**
Cache dùng chung cho toàn hệ thống theo chuẩn modular monolith.

**Implemented**
- `ICacheService` + `RedisCacheService` (get/set/get-or-set/remove/remove-by-prefix).
- `ICacheKeyFactory` + `CacheKeyFactory` (module-aware key format).
- `RedisConnectionProvider` (resilient connection, không crash khi Redis down).
- `AddCaching()` để bind options và đăng ký DI.

**Key format**
- Base: `{module}:{entity}:{scope}:{hash}`
- Version key: `{module}:{entity}:version`
- Versioned data key: `{module}:{entity}:v{version}:{scope}:{hash}`

**Invalidation strategy**
- Ưu tiên `version-key strategy`.
- CRUD chỉ cần tăng version key (`BumpVersionAsync(module, entity)`), không phải xóa thủ công nhiều key list/detail.

**Usage sample**
```csharp
var version = await cacheService.GetVersionAsync("catalog", "product");
var key = cacheKeyFactory.BuildVersionedKey(
    module: "catalog",
    entity: "product",
    version: version,
    scope: "list",
    hash: "category=3&page=1");

var data = await cacheService.GetOrSetAsync(key, LoadFromDbAsync, TimeSpan.FromMinutes(5));
```
