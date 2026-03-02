# Common/Attributes

**Purpose**
Attribute dùng chung để gắn metadata hoặc áp dụng cross-cutting behavior.

**What goes here**
Action/validation attributes, marker attributes.

**What should NOT go here**
Logic xử lý nặng hoặc nghiệp vụ đặc thù một module.

**Examples**
`ValidateModelAttribute.cs`, `RequireRoleAttribute.cs`.

**Rules**
- Attribute phải mô tả rõ tác dụng.
- Không dùng attribute để thay thế middleware khi không phù hợp.
