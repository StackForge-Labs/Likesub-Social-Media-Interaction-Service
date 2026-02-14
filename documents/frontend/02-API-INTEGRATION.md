# Frontend API Integration

## 1. Axios Configuration

File: `frontend/src/constants/api/options.constant.ts`

- `baseURL` lấy từ `NEXT_PUBLIC_API_URL`.
- Luôn set `NEXT_PUBLIC_API_URL` qua environment.
- Không phụ thuộc fallback local cho môi trường runtime chính thức.

## 1.1 Ổn Định Dependency Giữa Các Máy

Frontend dùng lockfile (`package-lock.json`) để giữ dependency ổn định ở mức package tree.

Khuyến nghị cài đặt:

```bash
cd frontend
npm i
```

## 2. API Clients

- `frontend/src/api/auth.api.ts`
- `frontend/src/api/user.api.ts`

Các endpoint constants:

- `frontend/src/constants/api/auth.endpoints.constant.ts`
- `frontend/src/constants/api/user.endpoints.constant.ts`

## 3. Auth + Token Refresh

- Access token được gắn ở request interceptor (`privateApi`).
- Khi 401:
  - queue requests đang chờ,
  - gọi `AuthApi.refreshToken()`,
  - replay request cũ nếu refresh thành công,
  - clear auth + redirect login nếu refresh thất bại.

File liên quan:

- `frontend/src/lib/axios/axios-instance.ts`
- `frontend/src/lib/axios/token-refresh.queue.ts`

## 4. Quy Ước Khi Thêm Endpoint Mới

1. Thêm endpoint constant trước.
2. Thêm method trong `src/api/<module>.api.ts`.
3. Thêm hook dữ liệu trong `src/hooks/api/`.
4. Gắn query key phù hợp trong `src/constants/query/query-keys.ts`.
5. Nếu mutation ảnh hưởng dữ liệu, invalidate đúng query keys.
