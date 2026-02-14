# Docker Workflow

## 1. Compose File

File chính cho dev:

- `container/compose/docker-compose.dev.yml`

## 2. Service Map

- `backend`: ASP.NET Core app (`dotnet watch`)
- `mysql-db`: MySQL 8
- `redis`: Redis 7 (password + appendonly + healthcheck)
- `redisinsight`: công cụ quan sát Redis (optional profile)
- `phpmyadmin`: DB admin tool

Thao tác chuẩn:

- khởi động: `npm run dev:up`
- dừng: `npm run dev:down`
- restart: `npm run dev:restart`

## 3. Networking & Volumes

- Network: `likesub-dev-network`
- Volumes:
  - `backend_bin`, `backend_obj`
  - `mysql_data_dev`
  - `redis_data`
  - `redisinsight_data`

## 4. Start RedisInsight (optional)

```bash
docker compose -p likesub -f container/compose/docker-compose.dev.yml --profile devtools up -d
```

## 5. Runtime Healthcheck

- MySQL: `mysqladmin ping -uroot -proot`
- Redis: `redis-cli -a <password> ping`

## 6. Kịch Bản Rebuild Sạch

```bash
npm run dev:down
npm run docker:clean-cache
npm run dev:rebuild
```
