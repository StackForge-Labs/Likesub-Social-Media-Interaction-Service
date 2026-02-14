# Quick Start

## 1. Prerequisites

- Docker + Docker Compose
- Node.js 20+
- npm

## 2. Setup Environment Files

Từ root project:

```bash
npm run setup:dev
```

Script sẽ copy:

- `container/environment/frontend/.env.example` -> `frontend/.env`
- `container/environment/backend/appsettings.Development.template.json` -> `backend/appsettings.Development.json`

## 3. Start Stack (Docker)

Khuyến nghị dùng detached mode:

```bash
npm run dev:up
```

Lần đầu hoặc khi đổi Dockerfile/dependency:

```bash
npm run dev:rebuild
```

## 4. Check Runtime

```bash
npm run dev:ps
npm run dev:logs
```

Các service chính:

- backend: `:8080`
- mysql: `:3306`
- redis: `:6379`
- phpmyadmin: `:8070`
- redisinsight (profile devtools): `:5540`

## 5. Stop Stack

```bash
npm run dev:down
```
