# Infrastructure/Database

**Purpose**
Tầng truy cập dữ liệu dựa trên EF Core.

**What goes here**
`DbContext`, EF Core configurations, migrations, repository implementations.

**What should NOT go here**
Logic nghiệp vụ, validation, hoặc xử lý request/response.

**Examples**
`ApplicationDbContext.cs`, `PostRepository.cs`, `PostEntityConfiguration.cs`.

**Rules**
- Repository chỉ làm việc với DbContext và entities.
- Controller/Service không truy cập DbContext trực tiếp.
- Migrations tự chạy khi `ASPNETCORE_ENVIRONMENT=Development`, prod chỉ chạy khi có `--migration`.
