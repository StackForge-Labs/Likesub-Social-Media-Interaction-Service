# Coding Standards

## 1. Naming

- Namespace backend theo module rõ ràng.
- Interface có prefix `I`.
- Class/service/repository dùng tên theo nghiệp vụ.

## 2. Backend Rules

- Không query DB trong Controller.
- Không đưa business logic vào Infrastructure.
- Không truy cập Redis trực tiếp từ Controller.
- Dùng `ICacheService` + `ICacheKeyFactory` cho cache.

## 3. Error Handling

- Không nuốt exception im lặng.
- Log warning/error với context (`module`, `entity`, `operation`).
- Fallback hợp lý nếu dependency ngoài (Redis) bị down.

## 4. API Contract

- DTO request/response tách khỏi entity.
- Response format ổn định giữa frontend/backend.
- Nếu đổi contract, phải cập nhật API client frontend và docs.

## 5. Frontend Rules

- Endpoint constants tách riêng.
- Dùng hooks để gọi API thay vì gọi trực tiếp trong UI component.
- Mutation phải invalidate đúng query keys.
- Không hard-code base API URL trong component.

## 6. Commit Message Gợi Ý

Format khuyến nghị:

```text
<type>(<scope>): <summary>
```

Ví dụ:

- `feat(cache): add redis version-key invalidation for catalog module`
- `refactor(database): rename persistence layer to database`
- `docs(project): add development and operations documentation`
