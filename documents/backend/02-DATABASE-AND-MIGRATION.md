# Database and Migration Guide

## 1. Database Configuration Sources

Primary runtime source is environment variables:

- Docker Compose environment defaults in `Infrastructure/compose/`
- CI/CD injected environment variables

Template fallback (local host run):

- `backend/appsettings.Development.json`
- `Infrastructure/env/backend/appsettings.Development.template.json`

Required keys:

- `Database__Provider`
- `Database__ConnectionString`
- `Database__ServerVersion`

## 2. DI Registration

File: `backend/Infrastructure/Database/DependencyInjection.cs`

- bind `DatabaseOptions`
- validate `ConnectionString`
- register `ApplicationDbContext` with MySQL provider
- enable retry policy (`MaxRetryCount`, `MaxRetryDelaySeconds`)

## 3. Migration Runtime

File: `backend/Infrastructure/Database/DatabaseMigrator.cs`

Migrations run when:

- `ASPNETCORE_ENVIRONMENT=Development`, or
- app starts with `--migration`

## 4. Migration Commands

Run inside backend container:

```bash
docker exec -it likesub-backend-dev sh -lc "dotnet ef migrations add <MigrationName>"
docker exec -it likesub-backend-dev sh -lc "dotnet ef database update"
```

Start stack first:

```bash
npm run dev:up
```

## 5. Checklist When Adding New Entity

1. Add `DbSet` in `ApplicationDbContext`.
2. Add entity configuration if needed.
3. Create migration.
4. Update DB in dev/ci.
5. Update related module docs.
