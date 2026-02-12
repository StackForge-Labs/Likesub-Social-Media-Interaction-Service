# Features

**Purpose**
Tổ chức code theo module nghiệp vụ để dễ mở rộng và tách microservice sau này.

**What goes here**
Controllers, DTOs, Services, Repositories (interface + implementation), Validators, Mapping profiles theo từng module.

**What should NOT go here**
`DbContext`, Redis/Auth configs, options bindings, hoặc hạ tầng kỹ thuật.

**Examples**
`PostsController.cs`, `PostService.cs`, `PostRepository.cs`, `CreatePostRequest.cs`.

**Rules**
- Mỗi module có file entry `*Module.cs` để đăng ký DI.
- Controller -> Service -> Repository là luồng bắt buộc.
- Module không gọi implementation của module khác.
- Không rải logic hạ tầng vào module.
