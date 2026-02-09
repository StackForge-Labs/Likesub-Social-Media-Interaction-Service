# Common

**Purpose**
Thành phần dùng chung toàn hệ thống, hỗ trợ các module mà không chứa nghiệp vụ riêng.

**What goes here**
Attributes, extensions, middlewares, utils (thuần), helpers chia sẻ cho nhiều module.

**What should NOT go here**
Logic nghiệp vụ của 1 module cụ thể, hoặc hạ tầng kỹ thuật (DB/Redis/Auth).

**Examples**
`ValidateModelAttribute.cs`, `ServiceCollectionExtensions.cs`, `DateTimeUtil.cs`, `ExceptionHandlingMiddleware.cs`.

**Rules**
- Chỉ chứa phần dùng chung thật sự, API ổn định.
- Không biến Common thành “thùng rác”.
- Không tham chiếu ngược vào module cụ thể.
