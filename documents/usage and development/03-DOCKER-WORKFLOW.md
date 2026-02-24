# Docker Workflow

## 1. Compose Files

- `Infrastructure/compose/docker-compose.dev.yml`
- `Infrastructure/compose/docker-compose.ci.yml`
- `Infrastructure/compose/docker-compose.prod.yml`

## 2. Environment Files

- `Infrastructure/env/frontend/.env.example`
- `Infrastructure/env/backend/appsettings.Development.template.json`
- Root `Infrastructure/env/.env*` is not used at this time.

## 3. Development Commands

- start: `npm run dev:up`
- stop: `npm run dev:down`
- rebuild: `npm run dev:rebuild`
- logs: `npm run dev:logs`

## 4. Optional Dev Tools

```bash
docker compose -p likesub -f Infrastructure/compose/docker-compose.dev.yml --profile devtools up -d
```

## 5. Healthchecks

- backend liveness: `/health/live`
- backend readiness: `/health/ready`
- mysql: `mysqladmin ping`
- redis: `redis-cli ping`

## 6. Clean Rebuild

```bash
npm run dev:down
npm run docker:clean-cache
npm run dev:rebuild
```
