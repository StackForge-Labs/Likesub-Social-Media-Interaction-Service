# Compose Layout

- `docker-compose.dev.yml`: local development stack with optional `devtools` profile.
- `docker-compose.ci.yml`: CI runtime stack using a pre-built immutable image tag.
- `docker-compose.prod.yml`: production stack; supports external data services by default and `selfhosted-data` profile when needed.

## Recommended usage

```bash
# Dev
docker compose -p likesub -f Infrastructure/compose/docker-compose.dev.yml up -d

# CI
BACKEND_IMAGE=backend:ci-<git-sha> docker compose -f Infrastructure/compose/docker-compose.ci.yml up -d

# Prod
BACKEND_IMAGE=ghcr.io/your-org/likesub-backend@sha256:<digest> docker compose -f Infrastructure/compose/docker-compose.prod.yml up -d
```
