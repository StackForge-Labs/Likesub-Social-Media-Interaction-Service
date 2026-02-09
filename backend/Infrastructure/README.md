# Infrastructure

**Purpose**
Chứa các thành phần kỹ thuật dùng chung (persistence, auth, cache, options).

**What goes here**
DbContext, EF Core configs, Redis clients, auth handlers, option models, extension registrations.

**What should NOT go here**
Logic nghiệp vụ hoặc code theo module.

**Examples**
`ApplicationDbContext.cs`, `AuthExtensions.cs`, `RedisCacheService.cs`.

**Rules**
- Chỉ chứa hạ tầng kỹ thuật, không chứa nghiệp vụ.
- Đăng ký DI rõ ràng, ưu tiên extension methods.
