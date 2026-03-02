# Infrastructure Layer

Root `Infrastructure/` contains deployment and operations assets, separated from application source code.

## Structure

- `docker/`: Docker build definitions for `dev`, `ci`, `prod`.
- `compose/`: runtime orchestration files for each environment.
- `env/`: environment templates (`.env.*.example`) and app config templates.
- `scripts/`: helper scripts (`setup-env.js`, `init-db.sql`).

## Design Rules

- No hardcoded secrets in compose files.
- Runtime config is environment-variable driven.
- Production image must use immutable reference (tag or digest, digest preferred).
- Health endpoints are required: `/health/live`, `/health/ready`.
- CI/CD should only depend on paths in this folder plus application code folders.
