# Module Development Playbook (Backend)

Tài liệu này mô tả cách thêm 1 module mới mà không phá kiến trúc hiện tại.

## 1. Cấu Trúc Đề Xuất

```text
backend/Features/<ModuleName>/
  <ModuleName>Module.cs
  Controllers/
  DTOs/
  Services/
  Repositories/
  Validators/
```

## 2. Nguyên Tắc Boundary

- Controller chỉ orchestration HTTP.
- Business logic đặt ở Service/Handler.
- Repository chỉ data access.
- Không cho module gọi implementation module khác.
- Dùng contract/interface nếu cần giao tiếp chéo module.

## 3. Wiring

1. Tạo `<ModuleName>Module.cs` và đăng ký DI của module.
2. Gọi `services.Add<ModuleName>Module()` từ `Program.cs` hoặc extension tổng hợp modules.
3. Giữ Infrastructure tách khỏi business.

## 4. Tích Hợp Cache Đúng Chỗ

- Read-heavy cache ở Service hoặc QueryHandler.
- Write path chỉ `BumpVersionAsync(module, entity)`.
- Không gọi Redis trực tiếp từ Controller.

## 5. Mẫu Service (Pseudo)

```csharp
public sealed class ProductService(
    IProductRepository repository,
    ICacheService cacheService,
    ICacheKeyFactory keyFactory)
{
    public async Task<IReadOnlyList<ProductDto>> GetListAsync(GetProductsQuery query)
    {
        var version = await cacheService.GetVersionAsync("catalog", "product");
        var key = keyFactory.BuildVersionedKey("catalog", "product", version, "list", query.ToCacheHash());
        return await cacheService.GetOrSetAsync(key, () => repository.GetListAsync(query), TimeSpan.FromMinutes(5));
    }

    public async Task UpdateAsync(UpdateProductCommand command)
    {
        await repository.UpdateAsync(command);
        await cacheService.BumpVersionAsync("catalog", "product");
    }
}
```

## 6. Done Checklist Cho Mỗi Module

1. Có module entry file và DI registration.
2. Có luồng GET list/detail + POST/PUT/DELETE rõ ràng.
3. Có cache read và invalidation write.
4. Có test tối thiểu cho service/repository.
5. Có tài liệu module trong `documents/backend/`.
