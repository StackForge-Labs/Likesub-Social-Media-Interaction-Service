# Likesub Social Media Interaction Service

## Repository Layout

```text
.
├─ backend/
├─ frontend/
├─ Infrastructure/
│  ├─ docker/
│  ├─ compose/
│  ├─ env/
│  └─ scripts/
└─ .github/workflows/
```

## Infrastructure-First Principles

- Deployable by immutable Docker images (tag/digest controlled by env).
- Environment variable based runtime config (no hardcoded secrets in compose).
- Health endpoints exposed by backend (`/health/live`, `/health/ready`).
- CI/CD pipeline consumes `Infrastructure/*` as deployment source of truth.
- Multi-environment compose strategy: `dev`, `ci`, `prod`.

## Local Development

```bash
npm run setup:dev
npm run dev:up
```

## Docs

- `documents/PROJECT_STRUCTURE.md`
- `documents/usage and development/01-QUICK-START.md`
- `documents/usage and development/03-DOCKER-WORKFLOW.md`
