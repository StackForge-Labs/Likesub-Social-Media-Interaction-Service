# Infrastructure

**Purpose**
Chứa các thành phần kỹ thuật dùng chung (database, auth, cache, options).

**Note**
`backend/Infrastructure/` là application infrastructure.
Deployment infrastructure nằm ở root `Infrastructure/` (docker, compose, env, scripts).

**What goes here**
DbContext, EF Core configs, Redis clients, auth handlers, option models, extension registrations.

**What should NOT go here**
Logic nghiệp vụ hoặc code theo module.

**Examples**
`ApplicationDbContext.cs`, `AuthExtensions.cs`, `RedisCacheService.cs`.

**Rules**
- Chỉ chứa hạ tầng kỹ thuật, không chứa nghiệp vụ.
- Đăng ký DI rõ ràng, ưu tiên extension methods.
- Hiện chỉ hỗ trợ MySQL; vẫn giữ `Database:Provider` để mở rộng sau này.
