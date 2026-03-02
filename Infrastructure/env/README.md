# Environment Files

- `backend/appsettings.Development.template.json`: local host fallback appsettings template.
- `frontend/.env.example`: frontend runtime variables.

Root-level `.env*` files are intentionally not used for now.
Use shell environment variables or CI/CD secret injection when needed.

For GitOps:

1. Keep only non-secret defaults in repo.
2. Inject secrets from your platform secret manager.
3. Pin `BACKEND_IMAGE` to immutable tag or digest in deployment environment.
