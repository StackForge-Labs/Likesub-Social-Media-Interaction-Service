# Backend structure (feature-based monolith)

Tài liệu này mô tả ý nghĩa, trách nhiệm và cách sử dụng các folder chính trong backend (ASP.NET Web API + EF Core) theo cấu trúc feature-based.

## Ranh giới tầng (boundary bắt buộc)

- Controller chỉ nhận/validate request, gọi Service, trả response.
- Service xử lý nghiệp vụ, orchestration, gọi Repository.
- Repository chỉ truy cập dữ liệu, làm việc với `DbContext`.
- `DbContext` chỉ đặt ở tầng Persistence, không được truy cập trực tiếp từ Controller/Service.

## /Features

- Mục đích: Tập trung code theo từng feature (Posts, Likes, Comments, Users...) để dễ mở rộng và bảo trì.
- Chứa: Controllers, DTOs, Services, Repositories, Validators, Mapping profiles theo từng feature.
- Ví dụ file/class: `PostsController.cs`, `PostService.cs`, `PostRepository.cs`, `CreatePostRequest.cs`.
- Nên:
- Tên feature rõ nghĩa, nhất quán (`Posts`, `Likes`).
- Mỗi feature có ranh giới đủ lớn (tránh phân mảnh).
- Không nên:
- Tạo “feature” chỉ chứa 1 class lẻ tẻ.
- Trộn code Infrastructure vào đây (DbContext, Redis, Auth configs).

## /Infrastructure

- Mục đích: Chứa các thành phần kỹ thuật dùng chung (persistence, auth, cache, cấu hình...).
- Chứa: DbContext, cấu hình EF Core, Redis clients, JWT/auth handlers, option models.
- Ví dụ file/class: `ApplicationDbContext.cs`.
- Nên:
- Tách rõ phần thuần kỹ thuật, không chứa nghiệp vụ.
- Định nghĩa DI registrations ở đây hoặc trong `Program.cs` gọi tới đây.
- Không nên:
- Đặt Controller/Service/Repository của feature ở đây.
- Trộn logic nghiệp vụ vào Infrastructure.

### /Infrastructure/Persistence

- Mục đích: Tầng truy cập dữ liệu (EF Core).
- Chứa: `DbContext`, EF Core configurations, migrations, repositories (implementation).
- Ví dụ file/class: `ApplicationDbContext.cs`.
- Nên:
- Repository chỉ phụ thuộc `DbContext` và entities.
- Tách `EntityTypeConfiguration` nếu model phức tạp.
- Không nên:
- Query từ Controller/Service trực tiếp vào `DbContext`.
- Gắn logic nghiệp vụ vào repository.

### /Infrastructure/Redis

- Mục đích: Tích hợp cache/Redis.
- Chứa: Redis connection, cache service, key conventions.
- Ví dụ file/class: `RedisCacheService.cs`, `RedisOptions.cs`.
- Nên:
- Bọc Redis qua interface (`ICacheService`).
- Quy ước key rõ ràng, có prefix theo feature.
- Không nên:
- Gọi Redis trực tiếp trong Controller.
- Để cache logic nằm rải rác nhiều nơi.

### /Infrastructure/Auth

- Mục đích: Xác thực/ủy quyền (JWT, API key, policy, claims).
- Chứa: JWT settings, auth handlers, policy definitions.
- Ví dụ file/class: `JwtOptions.cs`, `AuthExtensions.cs`.
- Nên:
- Đóng gói cấu hình auth qua extension method (`AddAuth`).
- Phân tách policy rõ ràng cho từng nhóm quyền.
- Không nên:
- Viết logic auth trực tiếp trong Controller.
- Hard-code secrets trong code.

## /Common

- Mục đích: Tiện ích và thành phần dùng chung toàn hệ thống.
- Chứa: Attributes, extensions, helpers, middlewares dùng chung.
- Ví dụ file/class: `ValidateModelAttribute.cs`, `ServiceCollectionExtensions.cs`, `DateTimeHelper.cs`, `ExceptionHandlingMiddleware.cs`.
- Nên:
- Chỉ chứa thành phần thực sự dùng chung nhiều feature.
- Giữ API của Common ổn định.
- Không nên:
- Đưa logic nghiệp vụ của 1 feature vào Common.
- Lạm dụng Common như “thùng rác”.

### /Common/Attributes

- Mục đích: Attribute dùng chung để gắn metadata hoặc áp dụng cross-cutting behavior.
- Chứa: Action/validation attributes, marker attributes.
- Ví dụ file/class: `ValidateModelAttribute.cs`, `RequireRoleAttribute.cs`.
- Nên:
- Chỉ dùng cho quy tắc áp dụng rộng, không gắn nghiệp vụ đặc thù 1 feature.
- Đặt tên rõ ràng và mô tả hiệu ứng của attribute.
- Không nên:
- Đưa logic xử lý nặng vào attribute.
- Lạm dụng attribute để thay thế middleware/pipeline.

### /Common/Extensions

- Mục đích: Các extension methods dùng chung cho DI, HTTP, string, collection...
- Chứa: Extension cho `IServiceCollection`, `IApplicationBuilder`, `HttpContext`, `IQueryable`.
- Ví dụ file/class: `ServiceCollectionExtensions.cs`, `HttpContextExtensions.cs`.
- Nên:
- Nhóm extension theo chủ đề rõ ràng.
- Trả về đối tượng gốc để chain fluent khi phù hợp.
- Không nên:
- Tạo extension làm thay đổi trạng thái khó đoán.
- Đặt logic nghiệp vụ vào extension dùng chung.

### /Common/Helpers

- Mục đích: Hàm tiện ích thuần (pure) dùng lại nhiều nơi.
- Chứa: Helper xử lý thời gian, chuỗi, file, mapping nhẹ.
- Ví dụ file/class: `DateTimeHelper.cs`, `SlugHelper.cs`.
- Nên:
- Giữ helper stateless, dễ test.
- Ưu tiên phương thức tĩnh, không phụ thuộc DI nếu không cần.
- Không nên:
- Tạo helper như “kho chứa mọi thứ”.
- Đặt code truy cập DB hoặc HTTP trong helpers.

### /Common/Middlewares

- Mục đích: Cross-cutting pipeline của ASP.NET Core (logging, error handling, correlation id...).
- Chứa: Middleware classes và extension đăng ký.
- Ví dụ file/class: `ExceptionHandlingMiddleware.cs`, `RequestLoggingMiddleware.cs`.
- Nên:
- Middleware chỉ xử lý concern chung, không chứa nghiệp vụ.
- Tạo extension `UseXyz` để đăng ký thống nhất.
- Không nên:
- Viết middleware chuyên biệt cho 1 feature.
- Nuốt exception mà không log hoặc không trả response chuẩn.

## Sai lầm thường gặp

- Controller gọi thẳng `DbContext` hoặc truy vấn trực tiếp.
- Service chứa quá nhiều chi tiết truy cập dữ liệu thay vì qua Repository.
- Repository chứa logic nghiệp vụ (tính toán/điều kiện business).
- Đặt cấu hình kỹ thuật (Redis/Auth) trong `Features`.
- Tạo Common quá lớn, mọi thứ đều đẩy vào đó.

## Checklist khi thêm feature mới

1. Tạo folder feature trong `/Features` (ví dụ: `Posts`).
2. Tạo Controller và DTO cho request/response.
3. Tạo Service + interface và đăng ký DI.
4. Tạo Repository + interface và đăng ký DI.
5. Bổ sung entity/configuration ở Persistence nếu cần.
6. Thêm mapping/validation cho DTO.
7. Thêm test tối thiểu cho Service hoặc Repository.
8. Cập nhật tài liệu hoặc README nếu có quy ước mới.
