# Infrastructure/Auth

**Purpose**
Xác thực và ủy quyền (JWT, policies, claims).

**What goes here**
JWT settings, auth handlers, policy definitions, auth extension.

**What should NOT go here**
Nghiệp vụ theo feature hoặc secrets hard-code.

**Examples**
`JwtOptions.cs`, `AuthExtensions.cs`.

**Rules**
- Đóng gói cấu hình auth qua extension method.
- Tách policy rõ ràng, không nhúng vào Controller.
