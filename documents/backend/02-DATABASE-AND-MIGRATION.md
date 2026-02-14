# Database & Migration Guide

## 1. Cấu Hình Database

Nguồn cấu hình:

- `backend/appsettings.Development.json`
- `container/environment/backend/appsettings.Development.template.json`

Section `Database`:

```json
{
  "Provider": "mysql",
  "ConnectionString": "server=mysql-db;port=3306;database=Likesub_Social_Media_Interaction;user=likesub;password=likesub_pass;",
  "ServerVersion": "8.0.0"
}
```

## 2. DI Registration

File: `backend/Infrastructure/Database/DependencyInjection.cs`

- Bind `DatabaseOptions`.
- Validate `ConnectionString`.
- Đăng ký `ApplicationDbContext` với `UseMySql`.
- Bật retry policy theo `MaxRetryCount`, `MaxRetryDelaySeconds`.

## 3. Migration Runtime

File: `backend/Infrastructure/Database/DatabaseMigrator.cs`

Migrations sẽ chạy khi:

- `ASPNETCORE_ENVIRONMENT=Development`, hoặc
- có flag CLI `--migration`.

## 4. Lệnh Thao Tác Migrations

Chạy qua Docker (không chạy trực tiếp trên host):

```bash
docker exec -it likesub-backend-dev sh -lc "dotnet ef migrations add <MigrationName>"
docker exec -it likesub-backend-dev sh -lc "dotnet ef database update"
```

Đảm bảo stack đang chạy trước khi thao tác migration:

```bash
npm run dev:up
```

## 5. Checklist Khi Thêm Entity Mới

1. Thêm DbSet vào `ApplicationDbContext`.
2. Thêm cấu hình entity (nếu dùng Fluent API).
3. Tạo migration mới.
4. Update DB ở dev/CI.
5. Cập nhật docs module tương ứng.
