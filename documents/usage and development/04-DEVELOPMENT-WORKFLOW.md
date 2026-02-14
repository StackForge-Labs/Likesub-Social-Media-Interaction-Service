# Development Workflow

## 1. Quy Trình Đề Xuất

1. Kéo code mới nhất và sync dependencies.
2. Tạo branch theo scope (`feature/...`, `fix/...`).
3. Chạy stack dev bằng Docker.
4. Implement theo boundary module.
5. Tự test trong container + rà logs.
6. Commit theo nhóm thay đổi logic.

## 2. Backend Workflow

- Thêm module trong `backend/Features/<ModuleName>/`.
- Đăng ký DI ở module entry (`<ModuleName>Module.cs`).
- Wire module vào startup.
- Nếu có read-heavy endpoint, tích hợp Redis cache trong Service/QueryHandler.
- Sau write, gọi invalidation theo version key.

## 3. Frontend Workflow

- Tạo endpoint constants.
- Tạo API client method.
- Tạo hook React Query.
- Tạo/điều chỉnh UI pages/components.
- Invalidate query keys hợp lý sau mutation.

## 4. Code Review Checklist

- Không vượt boundary module.
- Không cho controller truy cập DbContext trực tiếp.
- Không hard-code secrets/password.
- Có logs ở điểm lỗi hạ tầng.
- Có fallback an toàn khi Redis không sẵn sàng.

## 5. Documentation Checklist

Sau khi merge feature:

1. Cập nhật docs backend/frontend nếu có thay đổi contract.
2. Cập nhật command docs nếu thêm script mới.
3. Cập nhật troubleshooting nếu phát hiện lỗi vận hành mới.
