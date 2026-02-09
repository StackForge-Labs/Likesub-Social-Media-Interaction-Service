# Features

**Purpose**
Tổ chức code theo feature để dễ mở rộng, dễ bảo trì trong backend monolithic.

**What goes here**
Controllers, DTOs, services, repositories (interface + implementation), validators, mapping profiles theo từng feature.

**What should NOT go here**
DbContext, Redis/Auth configs, options bindings, hoặc các thành phần hạ tầng.

**Examples**
`PostsController.cs`, `PostService.cs`, `PostRepository.cs`, `CreatePostRequest.cs`.

**Rules**
- Mỗi feature là một module rõ ràng, đủ lớn.
- Controller gọi Service, Service gọi Repository, Repository dùng DbContext.
- Không rải logic hạ tầng vào feature.
