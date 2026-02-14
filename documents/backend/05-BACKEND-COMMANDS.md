# Backend Commands (Docker-First)

Tài liệu này chỉ dùng lệnh Docker hoặc custom scripts ở `package.json`.

## 1. Khởi động backend stack

```bash
npm run setup:dev
npm run dev:up
```

## 2. Kiểm tra trạng thái và logs

```bash
npm run dev:ps
npm run dev:log:backend
```

## 3. Mở shell backend container

```bash
npm run dev:backend
```

Thao tác này dùng khi cần chạy lệnh kỹ thuật (EF, build) bên trong container.

## 4. Build backend trong container

```bash
docker exec -it likesub-backend-dev sh -lc "dotnet build"
```

## 5. EF Core migrations trong container

Tạo migration:

```bash
docker exec -it likesub-backend-dev sh -lc "dotnet ef migrations add <MigrationName>"
```

Apply migration:

```bash
docker exec -it likesub-backend-dev sh -lc "dotnet ef database update"
```

## 6. Redis shell

```bash
npm run dev:redis
```

## 7. HTTP smoke test

Qua Docker network, dùng file `backend/backend.http` với host service name:

```http
@backend_HostAddress = http://backend:8080
```
