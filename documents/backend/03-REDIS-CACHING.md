# Redis Caching Guide

## 1. Mục Tiêu

Thiết lập cache dùng chung cho modular monolith, key phân vùng theo module, invalidation rõ ràng và an toàn khi Redis down.

## 2. Thành Phần Chính

- Options: `backend/Infrastructure/Options/RedisOptions.cs`
- DI extension: `backend/Infrastructure/Redis/DependencyInjection.cs`
- Interface: `backend/Infrastructure/Redis/ICacheService.cs`
- Service: `backend/Infrastructure/Redis/RedisCacheService.cs`
- Key builder: `backend/Infrastructure/Redis/ICacheKeyFactory.cs`, `backend/Infrastructure/Redis/CacheKeyFactory.cs`
- Connection provider resilient: `backend/Infrastructure/Redis/RedisConnectionProvider.cs`

## 3. Quy Ước Key

Base key:

```text
{module}:{entity}:{scope}:{hash}
```

Versioning keys:

```text
{module}:{entity}:version
{module}:{entity}:v{version}:{scope}:{hash}
```

Ví dụ:

- `catalog:product:v5:list:category=3&page=1`
- `identity:user:v8:detail:42`

## 4. Invalidation Strategy

Chiến lược đang dùng: `version-key strategy`.

- Read list/detail luôn kèm version hiện tại.
- Sau CRUD chỉ cần `BumpVersionAsync(module, entity)`.
- Không cần xóa hàng loạt key theo prefix.

## 5. Luồng Sử Dụng Trong Module

### GET list/detail

```csharp
var version = await cacheService.GetVersionAsync("catalog", "product");
var key = cacheKeyFactory.BuildVersionedKey("catalog", "product", version, "list", "category=3&page=1");

var data = await cacheService.GetOrSetAsync(
    key,
    () => repository.GetListAsync(request),
    TimeSpan.FromMinutes(5));
```

### POST/PUT/DELETE

```csharp
await repository.SaveChangesAsync();
await cacheService.BumpVersionAsync("catalog", "product");
```

## 6. Resilience

Khi Redis unavailable:

- Request không crash.
- Service log warning.
- Read path fallback sang DB/source factory.

## 7. Gợi Ý TTL

- List read-heavy: 2-5 phút.
- Detail ít thay đổi: 1-3 phút.
- Aggregate dashboard: 30-60 giây.
