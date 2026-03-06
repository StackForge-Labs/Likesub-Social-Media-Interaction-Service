# Infrastructure

**Purpose**
Chứa các thành phần kỹ thuật dùng chung cho backend (database, auth, cache, options).

**Note**
`backend/Infrastructure/` là application infrastructure.
Deployment infrastructure nằm ở root `Infrastructure/` (docker, compose, env, scripts).

**What goes here**
DbContext, EF Core configs, Redis clients, auth handlers, option models, extension registrations.

**What should NOT go here**
Logic nghiệp vụ hoặc code theo module.

**Examples**
`ApplicationDbContext.cs`, `AuthExtensions.cs`, `RedisCacheService.cs`.

**Rules**
- Chỉ chứa hạ tầng kỹ thuật, không chứa nghiệp vụ.
- Đăng ký DI rõ ràng, ưu tiên extension methods.
- Hiện tại chỉ hỗ trợ MySQL + Redis.

## Cách sử dụng

### 1) Đăng ký Infrastructure trong `Program.cs`
```csharp
builder.Services.AddAppCors(builder.Configuration);
builder.Services.AddCaching(builder.Configuration);
builder.Services.AddDatabase(builder.Configuration);
```

### 2) Cấu hình tối giản (appsettings hoặc env vars)
```json
{
  "Cors": {
    "Enabled": true,
    "AllowedOrigins": [ "http://localhost:3000" ]
  },
  "Database": {
    "ConnectionString": "server=mysql-db;port=3306;database=Likesub_Social_Media_Interaction;user=likesub;password=likesub_pass;",
    "ServerVersion": "8.0.0"
  },
  "Redis": {
    "Enabled": true,
    "ConnectionString": "redis:6379,password=likesub_redis_pass,abortConnect=false",
    "InstancePrefix": "likesub:dev",
    "DefaultTtlSeconds": 300
  }
}
```

Env vars tương đương:
- `Cors__Enabled`
- `Cors__AllowedOrigins__0`
- `Cors__AllowedOrigins__1`
- `Cors__AllowCredentials`
- `Cors__PreflightMaxAgeSeconds`
- `Database__ConnectionString`
- `Database__ServerVersion`
- `Redis__Enabled`
- `Redis__ConnectionString`
- `Redis__InstancePrefix`
- `Redis__DefaultTtlSeconds`
- `Redis__EnableUnsafePrefixScan` (chỉ nên bật ở Development)

### 3) Migration policy
- `Development`: tự chạy migration khi app start.
- `Production`: chỉ chạy khi truyền cờ `--migrate` hoặc `--migrate-only`.
- Nếu migration fail, app vẫn chạy nhưng `/health/ready` sẽ fail.

### 4) Health checks
- `/health/live`: chỉ kiểm tra app process.
- `/health/ready`: kiểm tra DB, trạng thái migration, và Redis (nếu `Redis:Enabled=true`).
- Nếu Redis disabled, readiness vẫn healthy (cache là optional dependency).

### 5) Dùng cache trong service
```csharp
public sealed class ExampleService(ICacheService cache, ICacheKeyFactory keyFactory)
{
    public Task<MyDto> GetAsync(string id)
    {
        var key = keyFactory.BuildDetailKey("catalog", "product", id);
        return cache.GetOrSetAsync(key, () => LoadFromDbAsync(id), TimeSpan.FromMinutes(5));
    }

    private Task<MyDto> LoadFromDbAsync(string id) => Task.FromResult(new MyDto(id));
}
```

Lưu ý:
- Redis lỗi không làm app crash, cache tự fallback về source.
- `RemoveByPrefixAsync` mặc định bị tắt để tránh scan keys nguy hiểm trong production.
