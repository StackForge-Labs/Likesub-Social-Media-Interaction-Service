# ============================================
# SOCIAL SERVICE DEV-BASE IMAGE
# Contains: SDK + NuGet packages
# Excludes: Source code
# ============================================
FROM mcr.microsoft.com/dotnet/sdk:8.0

WORKDIR /app

# Copy project file only
COPY *.csproj ./

# Restore NuGet packages (baked into image)
RUN dotnet restore

# Dev environment
ENV ASPNETCORE_ENVIRONMENT=Development
ENV DOTNET_USE_POLLING_FILE_WATCHER=true
ENV DOTNET_WATCH_RESTART_ON_RUDE_EDIT=true

EXPOSE 8083

# No CMD - defined in docker-compose
