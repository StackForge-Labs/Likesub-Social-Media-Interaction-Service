# Common/Middlewares

**Purpose**
Cross-cutting pipeline của ASP.NET Core (logging, error handling, correlation id...).

**What goes here**
Middleware classes và extension đăng ký.

**What should NOT go here**
Middleware chuyên biệt cho một module.

**Examples**
`ExceptionHandlingMiddleware.cs`, `RequestLoggingMiddleware.cs`.

**Rules**
- Middleware chỉ xử lý concern chung.
- Không nuốt exception mà không log/response chuẩn.
