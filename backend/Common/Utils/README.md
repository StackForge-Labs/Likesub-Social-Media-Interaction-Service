# Common/Utils

**Purpose**
Hàm tiện ích thuần (pure) dùng lại nhiều nơi.

**What goes here**
Helpers stateless cho thời gian, chuỗi, format, slug, v.v.

**What should NOT go here**
Truy cập DB/HTTP, nghiệp vụ module, hoặc stateful services.

**Examples**
`DateTimeUtil.cs`, `SlugUtil.cs`.

**Rules**
- Ưu tiên static, dễ test.
- Không phụ thuộc DI nếu không thật sự cần.
