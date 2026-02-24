FROM mcr.microsoft.com/dotnet/sdk:8.0

WORKDIR /app

COPY backend/*.csproj ./
RUN dotnet restore backend.csproj

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_HTTP_PORTS=8080
ENV DOTNET_USE_POLLING_FILE_WATCHER=true
ENV DOTNET_WATCH_RESTART_ON_RUDE_EDIT=true

EXPOSE 8080
