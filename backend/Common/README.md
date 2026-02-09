# Common

**Purpose**
Tiện ích và thành phần dùng chung toàn hệ thống.

**What goes here**
Attributes, extensions, Ultils, middlewares dùng chung.

**What should NOT go here**
Logic nghiệp vụ của riêng một feature.

**Examples**
`ValidateModelAttribute.cs`, `ServiceCollectionExtensions.cs`, `DateTimeUltil.cs`, `ExceptionHandlingMiddleware.cs`.

**Rules**
- Chỉ chứa thành phần thật sự dùng chung.
- Không biến Common thành “thùng rác”.
