# Command Reference

Nguồn: `package.json` ở root.

## 1. Development

```bash
npm run setup:dev
npm run dev:up
npm run dev:down
npm run dev:build
npm run dev:rebuild
npm run dev:restart
npm run dev:pull
npm run dev:ps
```

## 2. Service Shell

```bash
npm run dev:backend
npm run dev:redis
```

## 3. Logs

```bash
npm run dev:logs
npm run dev:log:backend
```

## 4. Frontend (Host-stable)

```bash
cd frontend
npm i
npm run typecheck
npm run lint
npm run build
npm run dev
```

## 5. Docker Utilities

```bash
npm run docker:ps
npm run docker:stop-all
npm run docker:rm-all
npm run docker:prune
npm run docker:images
npm run docker:rmi-unused
npm run docker:volume-list
npm run docker:volume-prune
npm run docker:network-list
npm run docker:network-prune
npm run docker:reset
npm run docker:clean-cache
```

## 6. Build & Sync

```bash
npm run sync
```

## 7. Lưu Ý Quan Trọng

- Backend ưu tiên chạy qua Docker/custom script ở root.
- Frontend thao tác trực tiếp trong thư mục `frontend/` để đơn giản hóa.
