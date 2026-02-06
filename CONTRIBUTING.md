# 🤝 Contributing Guide

## 📋 Quy trình làm việc

### 1. Tạo Branch
```bash
# Checkout từ dev
git checkout dev
git pull origin dev

# Tạo branch với tên bất kỳ (trừ main và dev)
git checkout -b ten-branch-cua-ban

# Ví dụ:
git checkout -b feature/login
git checkout -b fix-bug-auth
git checkout -b minh-quiz-service
git checkout -b update-ui
```

### 2. Phát triển
```bash
# Làm việc trên branch
git add .
git commit -m "feat: mô tả ngắn gọn"

# Push lên remote
git push origin feature/ten-tinh-nang
```

### 3. Tạo Pull Request
- Vào GitHub → **Pull Requests** → **New Pull Request**
- Base: `dev` ← Compare: `feature/ten-tinh-nang`
- Điền thông tin theo template
- CI sẽ tự động chạy
- Chờ CI pass và review

### 4. Merge vào Dev
- Sau khi được approve và CI pass
- Merge PR vào `dev`

### 5. Release lên Main
- Tạo PR từ `dev` → `main`
- Nên approval từ lead/admin
- CI/CD sẽ tự động chạy

## 🚫 Quy tắc

### ❌ KHÔNG ĐƯỢC:
- Push trực tiếp lên `main` hoặc `dev`
- Merge khi CI đang fail
- Force push lên common branches(`dev`, `main`)

### ✅ NÊN:
- Tạo feature branch cho mỗi tính năng
- Viết commit message rõ ràng
- Test kỹ trước khi tạo PR

## 📝 Commit Message Convention

```
feat: thêm tính năng mới
fix: sửa bug
docs: cập nhật documentation
style: format code
refactor: refactor code
test: thêm tests
chore: cập nhật dependencies
```

## 🔄 Git Flow

```
main (production)
  ↑
  PR (với approval)
  ↑
dev (staging)
  ↑
  PR (với CI pass)
  ↑
any-branch-name (tự do đặt tên)
```

## 🏷️ Branch Naming (Tự do)

**Được phép:**
- ✅ Bất kỳ tên nào (trừ `main` và `dev`)
- ✅ `feature/login`, `fix-bug`, `minh-task`, `update-ui`
- ✅ Có thể dùng prefix hoặc không

**Khuyến nghị:**
- `feature/` - Tính năng mới
- `fix/` - Sửa bug  
- `hotfix/` - Khẩn cấp
- `ten-thanh-vien/` - Branch cá nhân

## 🧪 Testing

Trước khi tạo PR, đảm bảo:
```bash
```
### Reviewer checklist:
- [✅] Code logic đúng
- [✅] Không có security issues
- [✅] Performance tốt
- [✅] Code style nhất quán
- [✅] Documentation đầy đủ
- [✅] Tests pass
```
## 🆘 Cần giúp đỡ?

- Tạo issue trên GitHub
- Hỏi trong team chat
- Đọc documentation trong `/documents`

