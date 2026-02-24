# Quick Start

## 1. Prerequisites

- Docker + Docker Compose
- Node.js 20+
- npm

## 2. Bootstrap Environment Files

From repository root:

```bash
npm run setup:dev
```

This command creates local files from templates:

- `Infrastructure/env/frontend/.env.example` -> `frontend/.env`
- `Infrastructure/env/backend/appsettings.Development.template.json` -> `backend/appsettings.Development.json`

## 3. Start Development Stack

```bash
npm run dev:up
```

When Dockerfile/dependencies changed:

```bash
npm run dev:rebuild
```

## 4. Validate Runtime

```bash
npm run dev:ps
npm run dev:logs
curl -fsS http://localhost:8080/health/live
curl -fsS http://localhost:8080/health/ready
```

Main services:

- backend: `:8080`
- mysql: `:3306`
- redis: `:6379`

Optional tools (`devtools` profile):

- phpmyadmin: `:8070`
- redisinsight: `:5540`

## 5. Stop Stack

```bash
npm run dev:down
```
