# Infrastructure/Redis

**Purpose**
Cache dùng chung cho toàn hệ thống theo chuẩn modular monolith, với Redis là thành phần optional.

**Implemented**
- `ICacheService` + `RedisCacheService` (`Get/Set/GetOrSet/Remove/RemoveByPrefix`).
- `ICacheKeyFactory` + `CacheKeyFactory` để chuẩn hóa key theo module/entity.
- `RedisConnectionProvider` parse `Redis:ConnectionString` và áp dụng safe defaults.
- `AddCaching()` bind options + validate fail-fast khi Redis bật nhưng thiếu connection string.

**Configuration (simple)**
```json
"Redis": {
  "Enabled": true,
  "ConnectionString": "redis:6379,password=...",
  "InstancePrefix": "likesub:prod",
  "DefaultTtlSeconds": 300
}
```

**Runtime policy**
- Redis lỗi không làm app crash, request tự fallback về source.
- Log cảnh báo Redis có throttle để tránh spam khi outage.
- `GetVersionAsync/BumpVersionAsync` là API legacy, hiện no-op (luôn trả `1`).
- `RemoveByPrefixAsync` mặc định tắt; chỉ bật khi `Redis:EnableUnsafePrefixScan=true` và chạy `Development`.
