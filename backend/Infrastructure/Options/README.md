# Infrastructure/Options

**Purpose**
Các lớp bind cấu hình từ `appsettings.json`.

**What goes here**
Options classes và validation cho các section cấu hình.

**What should NOT go here**
Logic nghiệp vụ hoặc service implementations.

**Examples**
`DatabaseOptions.cs`, `RedisOptions.cs`, `CorsOptions.cs`.

**Rules**
- Mỗi options map 1 section trong cấu hình.
- Validate options ở startup.
