# Cấu Trúc Dự Án

## 1. Tổng Quan

Repository gồm 3 phần chính:

- `backend/`: .NET 8 Web API (Modular Monolith, chạy 1 host).
- `frontend/`: Next.js (App Router).
- `container/`: Docker Compose, Dockerfiles, env templates, script setup.

## 2. Sơ Đồ Thư Mục

```text
.
├─ backend/
│  ├─ Program.cs
│  ├─ Features/
│  ├─ Common/
│  └─ Infrastructure/
│     ├─ Database/
│     ├─ Redis/
│     ├─ Auth/
│     └─ Options/
├─ frontend/
│  ├─ src/app/
│  ├─ src/components/
│  ├─ src/api/
│  ├─ src/hooks/
│  └─ src/constants/
├─ container/
│  ├─ compose/
│  ├─ dockerfiles/
│  ├─ environment/
│  └─ scripts/
└─ documents/
```

## 3. Vai Trò Theo Khu Vực

### Backend

- `Features/`: module nghiệp vụ (hiện tại mới ở trạng thái skeleton/README).
- `Infrastructure/Database/`: EF Core + MySQL wiring, migration runner.
- `Infrastructure/Redis/`: cache abstraction dùng chung, key factory, invalidation strategy.
- `Infrastructure/Options/`: option classes bind từ `appsettings`.
- `Common/`: thành phần cross-cutting dùng chung.

### Frontend

- `src/app/`: pages/layouts theo route.
- `src/api/`: API clients (`auth.api.ts`, `user.api.ts`).
- `src/hooks/api/`: hooks tích hợp React Query.
- `src/lib/axios/`: axios instance + refresh token queue.

### Container

- `container/compose/docker-compose.dev.yml`: stack dev gồm backend, mysql, redis, redisinsight, phpmyadmin.
- `container/environment/`: templates cho backend/frontend env.
- `container/scripts/setup-env.js`: copy template env sang file local.

## 4. Trạng Thái Hiện Tại Cần Lưu Ý

- Backend đang có hạ tầng database + redis đầy đủ.
- Backend chưa có module API nghiệp vụ thực thi trong `Features/`.
- Frontend đã có contract endpoint cho `auth` và `users`, cần đồng bộ với backend implementation.
