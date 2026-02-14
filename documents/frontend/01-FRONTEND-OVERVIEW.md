# Frontend Overview

## 1. Stack

- Next.js App Router
- TypeScript
- Axios cho HTTP client
- TanStack React Query cho caching/query state

## 2. Cấu Trúc Chính

```text
frontend/src/
  app/                 # routes và layouts
  components/          # UI components
  layouts/             # layout phân vùng admin/client/auth
  api/                 # API client wrappers
  hooks/api/           # hooks dữ liệu (React Query)
  lib/axios/           # axios instance + token refresh queue
  constants/           # endpoint constants, query keys
  schemas/             # validation schemas
```

## 3. Data Flow

```text
UI Page/Component
  -> hook (useQuery/useMutation)
  -> api client (AuthApi/UserApi)
  -> axios instance (auth header, refresh token)
  -> backend API
```

## 4. Trạng Thái API Backend

- Frontend đã có endpoint contract cho `auth` và `users`.
- Backend hiện chưa implement module feature tương ứng hoàn chỉnh.
- Khi backend module hoàn thành, cần map response DTO thống nhất với types ở `frontend/src/types/`.
