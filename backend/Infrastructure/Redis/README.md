# Infrastructure/Redis

**Purpose**
Tích hợp Redis/cache cho hệ thống.

**What goes here**
Redis connection, cache service, key conventions, options.

**What should NOT go here**
Logic nghiệp vụ hoặc gọi Redis trực tiếp từ Controller.

**Examples**
`RedisCacheService.cs`, `RedisOptions.cs`.

**Rules**
- Bọc Redis qua interface (ví dụ `ICacheService`).
- Quy ước key rõ ràng, có prefix theo feature.
