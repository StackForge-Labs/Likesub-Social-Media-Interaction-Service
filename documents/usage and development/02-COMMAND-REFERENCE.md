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

## 4. Docker Utilities

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

## 5. Build & Sync

```bash
npm run sync
```

## 6. Lưu Ý Quan Trọng

- Tài liệu này ưu tiên các lệnh Docker/custom script.
- Nếu cần lệnh kỹ thuật cho backend (EF, build), chạy trong container `likesub-backend-dev`.
