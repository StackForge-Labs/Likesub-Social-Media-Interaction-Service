# Troubleshooting

## 1. Backend Không Kết Nối Được MySQL

Triệu chứng:

- lỗi connection refused hoặc timeout.

Kiểm tra:

```bash
npm run dev:ps
npm run dev:logs
```

Xử lý:

1. đảm bảo `mysql-db` healthy.
2. kiểm tra `Database:ConnectionString` trong `backend/appsettings.Development.json`.
3. restart stack: `npm run dev:restart`.

## 2. Redis Không Sẵn Sàng

Triệu chứng:

- warning từ `RedisConnectionProvider`.
- cache miss liên tục.

Kiểm tra:

```bash
docker exec -it likesub-redis-dev redis-cli -a likesub_redis_pass ping
```

Kết quả mong đợi: `PONG`.

## 3. Migrations Không Chạy

Xử lý:

```bash
docker exec -it likesub-backend-dev sh -lc "dotnet ef database update"
```

Nếu vẫn lỗi, kiểm tra migration list trong container:

```bash
docker exec -it likesub-backend-dev sh -lc "dotnet ef migrations list"
```

## 4. Frontend Build Lỗi Vì API URL

- Đảm bảo `NEXT_PUBLIC_API_URL` được set ở môi trường build.
- CI đang dùng biến trong `.github/workflows/frontend-ci.yml`.

## 5. Docker Cache Gây Lỗi Cũ

```bash
npm run dev:down
npm run docker:clean-cache
npm run dev:rebuild
```

## 6. Xung Đột Compose Project Name

Hiện scripts dùng cả `snms` và `likesub`.

Khuyến nghị:

- chuẩn hóa một project name duy nhất để tránh chạy song song 2 stack.
