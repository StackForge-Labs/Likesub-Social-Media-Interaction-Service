# Tài Liệu Dự Án Likesub

Thư mục `documents/` là điểm vào chính cho tài liệu kỹ thuật nội bộ.

## Điều Hướng Nhanh

- `documents/PROJECT_STRUCTURE.md`: bản đồ tổng thể repository, vai trò từng khu vực.
- `documents/backend/`: tài liệu backend (.NET 8, modular monolith, database, Redis cache).
- `documents/frontend/`: tài liệu frontend (Next.js, API integration, query/state).
- `documents/usage and development/`: quick start, command reference, Docker workflow, troubleshooting.
- Deployment assets nằm trong `Infrastructure/` (root) thay vì `container/`.

## Nguyên Tắc Cập Nhật

1. Mỗi khi thêm module backend mới, cập nhật `documents/backend/04-MODULE-DEVELOPMENT-PLAYBOOK.md`.
2. Mỗi khi thêm script hoặc đổi command, cập nhật `documents/usage and development/02-COMMAND-REFERENCE.md`.
3. Mỗi khi đổi config runtime (DB/Redis/API URL), cập nhật tài liệu tương ứng ở backend/frontend.
