# Modular Monolith (.NET Web API)

Mục tiêu: mô hình monolithic nhưng tách module rõ ràng để scale theo nghiệp vụ, dễ maintain, và có thể tách microservice mà không rewrite logic. Vẫn chỉ có 1 application, không tạo nhiều `Program.cs`.

## 1) Modular Monolith là gì (trong .NET Web API)

Modular Monolith là một ứng dụng duy nhất nhưng được chia thành các module tự chứa (self-contained) theo nghiệp vụ. Mỗi module có Controller/Service/Repository/DTO riêng và đăng ký DI qua file entry của module. Các module chỉ giao tiếp qua contract (interface/DTO), không gọi implementation của nhau.

## 2) Cấu trúc folder (feature-based + module)

```
/
  Common/
  Infrastructure/
    Persistence/
    Redis/
    Auth/
    Options/
  Features/
    Auth/
      AuthModule.cs
      Controllers/
      DTOs/
      Services/
      Repositories/
      Validators/
    Likes/
      LikesModule.cs
      Controllers/
      DTOs/
      Services/
      Repositories/
      Validators/
```

## 3) Trách nhiệm từng thành phần trong 1 module (ví dụ Auth/Login)

- Controller: nhận HTTP, validate request model, gọi Service, trả response.
- Service: xử lý nghiệp vụ (login, verify password, issue token), orchestration.
- Repository: truy cập dữ liệu (User, RefreshToken), không xử lý nghiệp vụ.
- DTO: request/response cho API, không chứa logic.
- Validator: validate dữ liệu đầu vào (FluentValidation), không truy cập DB nếu không cần.
- Module entry: `AuthModule.cs` đăng ký DI của module.

Ví dụ file entry module:
```csharp
// Features/Auth/AuthModule.cs
public static class AuthModule
{
    public static IServiceCollection AddAuthModule(this IServiceCollection services)
    {
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IAuthRepository, AuthRepository>();
        services.AddValidatorsFromAssemblyContaining<LoginRequestValidator>();
        return services;
    }
}
```

## 4) Luồng xử lý chuẩn

HTTP Request -> Controller -> Service -> Repository -> Infrastructure -> Database

## 5) Quy tắc boundary bắt buộc

- Module không gọi implementation của module khác (chỉ gọi interface/contract nếu cần).
- Infrastructure chỉ chứa hạ tầng, không chứa business logic.
- `DbContext` chỉ nằm trong `Infrastructure/Persistence`, không truy cập trực tiếp từ Controller/Service.
- Hiện chỉ hỗ trợ MySQL; vẫn giữ `Database:Provider` để mở rộng sau này.

## 6) Vì sao dễ tách microservice sau này

Module đã tách boundary rõ ràng (API + business + data access). Khi cần tách:
- Giữ nguyên Service/Repository/DTO của module.
- Di chuyển module sang project mới, thay đổi wiring (DI, config, DB).
=> Không phải rewrite logic, chỉ thay cấu hình và host.

## 7) Checklist đánh giá "đạt chuẩn Modular Monolith"

1. Mỗi module có file entry (`<ModuleName>Module.cs`) đăng ký DI.
2. Module tự chứa đầy đủ Controller/Service/Repository/DTO/Validator.
3. Không có Controller/Service gọi `DbContext` trực tiếp.
4. Không có module gọi implementation của module khác.
5. Infrastructure chỉ chứa tech concerns (DB, Redis, Auth, Options).
6. DTO không chứa business logic.
7. Common không bị lạm dụng cho logic nghiệp vụ.
8. 1 `Program.cs` duy nhất, app deploy 1 instance.

## 8) Ưu/nhược điểm so với các mô hình khác

So với Layered Monolith:
- Ưu: Boundary theo nghiệp vụ rõ hơn, ít cross-dependency, dễ scale team.
- Nhược: Cần kỷ luật module, setup DI/structure nhiều hơn.

So với Microservices:
- Ưu: Đơn giản vận hành, không tốn overhead distributed system.
- Nhược: Không scale độc lập theo hạ tầng như microservices.

## 9) Quy ước folder chi tiết

/Features
- Mục đích: Tập trung code theo module nghiệp vụ (Posts, Likes, Auth...).
- Chứa: Controllers, DTOs, Services, Repositories, Validators, Mapping profiles.
- Không đặt Infrastructure vào đây.

/Infrastructure
- Mục đích: Hạ tầng kỹ thuật dùng chung (persistence, auth, cache, options).
- Không chứa nghiệp vụ.

/Common
- Mục đích: Utilities dùng chung toàn hệ thống (middlewares, helpers, extensions).
- Không đưa logic nghiệp vụ vào đây.

## Sai lầm thường gặp

- Controller gọi `DbContext` trực tiếp.
- Service chứa query DB thay vì gọi Repository.
- Repository chứa logic nghiệp vụ.
- Infrastructure bị trộn business logic.
- Common bị dùng như "thùng rác".

## Checklist khi thêm module mới

1. Tạo folder module trong `/Features` (ví dụ: `Auth`).
2. Tạo `AuthModule.cs` để đăng ký DI.
3. Tạo Controller + DTO + Validator.
4. Tạo Service + Repository + interface và đăng ký DI.
5. Bổ sung entity/configuration ở Persistence nếu cần.
6. Thêm mapping/validation.
7. Thêm test tối thiểu cho Service hoặc Repository.
8. Cập nhật README nếu có quy ước mới.
