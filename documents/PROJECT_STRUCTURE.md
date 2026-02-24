# Cau Truc Du An

## 1. Tong Quan

Repository duoc tach ro thanh 4 khu vuc:

- `backend/`: .NET 8 Web API (modular monolith).
- `frontend/`: Next.js (App Router).
- `Infrastructure/`: Dockerfiles, Compose, env templates, script van hanh.
- `.github/workflows/`: CI/CD pipeline.

## 2. So Do Thu Muc

```text
.
├─ backend/
│  ├─ Program.cs
│  ├─ Features/
│  ├─ Common/
│  └─ Infrastructure/          # application infrastructure (DB, Redis, Auth...)
├─ frontend/
│  └─ ...
├─ Infrastructure/
│  ├─ docker/
│  │  ├─ backend.dev.Dockerfile
│  │  ├─ backend.ci.Dockerfile
│  │  └─ backend.prod.Dockerfile
│  ├─ compose/
│  │  ├─ docker-compose.dev.yml
│  │  ├─ docker-compose.ci.yml
│  │  └─ docker-compose.prod.yml
│  ├─ env/
│  │  ├─ backend/
│  │  └─ frontend/
│  └─ scripts/
│     ├─ setup-env.js
│     └─ init-db.sql
├─ .github/
│  └─ workflows/
└─ documents/
```

## 3. Vai Tro Theo Khu Vuc

### Backend

- `backend/Infrastructure/`: ha tang ky thuat trong code app (khac voi root `Infrastructure/`).
- `Features/`: module nghiep vu.
- `Common/`: cross-cutting concerns.

### Infrastructure (root)

- `Infrastructure/docker/`: image build logic cho dev/ci/prod.
- `Infrastructure/compose/`: orchestration theo moi truong.
- `Infrastructure/env/`: bien moi truong theo moi truong, phuc vu GitOps.
- `Infrastructure/scripts/`: script setup cho local va automation.

### CI/CD

- `.github/workflows/`: build, quality gate, ci runtime.
- Compose va Docker path da duoc tach khoi app source de de migrate VPS -> platform -> cloud.

## 4. Trang Thai Hien Tai

- Runtime config da uu tien qua environment variables.
- Docker Compose da co healthcheck endpoint cho backend (`/health/live`).
- Deployment layer da tach rieng khoi application layer.
