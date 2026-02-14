# Backend Overview

## 1. Stack

- Runtime: .NET 8 (`backend/backend.csproj`)
- Web: ASP.NET Core Web API
- DB ORM: EF Core + Pomelo MySQL
- Cache: StackExchange.Redis
- Validation package: FluentValidation (đã cài, chưa áp dụng vào module cụ thể)

## 2. Composition Root

File chính: `backend/Program.cs`

Luồng khởi động hiện tại:

1. `AddControllers`, Swagger.
2. `AddCaching(builder.Configuration)`.
3. `AddDatabase(builder.Configuration)`.
4. Map controllers.
5. Auto migration theo môi trường/flag.

## 3. Architecture Map

```text
HTTP Request
  -> Controllers (chưa có module controller thực tế)
  -> Service/Handler (sẽ nằm trong Features/<Module>/Services hoặc CQRS handlers)
  -> Repository
  -> Infrastructure/Database (ApplicationDbContext)
  -> MySQL

Cross-cutting:
  Infrastructure/Redis (cache service + key factory + invalidation)
```

## 4. Dependency Ngầm Định

- `Program.cs` phụ thuộc trực tiếp extension methods trong:
  - `backend/Infrastructure/Database/DependencyInjection.cs`
  - `backend/Infrastructure/Redis/DependencyInjection.cs`
- `DatabaseMigrator` chạy `Database.Migrate()` nếu có pending migrations.

## 5. Khu Vực Cần Triển Khai Tiếp

- `backend/Features/` hiện chưa có module thực thi.
- Cần thêm ít nhất 1 module mẫu (ví dụ `Catalog`/`Product`) để khép vòng API -> Service -> Repository -> Cache.
