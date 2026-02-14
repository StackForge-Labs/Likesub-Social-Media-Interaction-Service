# Query & State Guidelines

## 1. React Query Defaults

File: `frontend/src/provider/QueryProvider.tsx`

- `staleTime`: 5 phút (mặc định).
- `gcTime`: 10 phút.
- `retry`: 1 cho query, 0 cho mutation.

## 2. Query Keys

Tập trung tại:

- `frontend/src/constants/query/query-keys.ts`

Nguyên tắc:

- Mỗi module có namespace riêng (`AUTH`, `USERS`, ...).
- List key tách khỏi detail key.
- Nếu query có filter/sort/page, đưa params vào key.

## 3. Mutation Invalidation Pattern

Ví dụ `useUpdateProfile`:

- Optimistic update cho detail.
- Rollback khi lỗi.
- Invalidate `USERS.DETAIL`, `USERS.LIST`, `AUTH.ME` sau thành công.

## 4. Đồng Bộ Với Backend Redis Cache

Frontend cache (React Query) và backend cache (Redis) cần phối hợp:

- Frontend invalidates query keys sau mutation.
- Backend bump version key sau write operation.
- Tránh assumptions rằng frontend invalidate là đủ.
