# Common/Extensions

**Purpose**
Extension methods dùng chung cho DI, HTTP, string, collection.

**What goes here**
Extension cho `IServiceCollection`, `IApplicationBuilder`, `HttpContext`, `IQueryable`.

**What should NOT go here**
Logic nghiệp vụ hoặc extension gây side-effect khó đoán.

**Examples**
`ServiceCollectionExtensions.cs`, `HttpContextExtensions.cs`.

**Rules**
- Nhóm extension theo chủ đề rõ ràng.
- Ưu tiên fluent chaining khi hợp lý.
