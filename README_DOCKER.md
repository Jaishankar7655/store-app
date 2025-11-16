# Docker Setup

This guide shows how to run the entire application using Docker.

## What You Need

- Docker installed and running
- Docker Compose (comes with Docker Desktop)

## Quick Start

Build and start all services:
```bash
docker-compose up --build
```

Then access:
- Customer store: http://localhost
- Admin panel: http://localhost/admin
- Backend API: http://localhost/api
- Direct backend: http://localhost:8000/api

Stop everything:
```bash
docker-compose down
```

## Services

The docker-compose file runs these services:

- db: PostgreSQL database
- backend: Django REST API server
- admin-panel: React admin dashboard
- customer-frontend: React customer site
- nginx: Reverse proxy routing requests

## Configuration

You can change database settings in docker-compose.yml:

- DB_NAME: Database name (default: grocerystore)
- DB_USER: Database user (default: groceryuser)
- DB_PASSWORD: Database password (default: grocerypass)
- DB_HOST: Database host (default: db)
- DB_PORT: Database port (default: 5432)

## First Time Setup

After containers start, create a store manager account:

```bash
docker-compose exec backend python manage.py create_store_manager --username admin --password admin123
```

Then go to http://localhost/admin and login with those credentials.

## Development

For development with live file changes, add volumes to docker-compose.yml:

```yaml
volumes:
  - ./backend:/app
  - ./admin-panel:/app
  - ./customer-frontend:/app
```

## Production

For production, make sure to:

1. Change SECRET_KEY in docker-compose.yml
2. Set DEBUG=0
3. Store sensitive data in environment variables
4. Set up SSL certificates for HTTPS
5. Configure CORS properly
6. Use a managed database service

## Common Issues

Database connection errors:
- Wait a few seconds for the database container to start
- Restart the services

Port already in use:
- Change port mappings in docker-compose.yml
- Or stop other services using those ports

Build problems:
- Run `docker-compose build --no-cache` to rebuild everything from scratch

