# Docker Setup Guide

This guide explains how to run the grocery store application using Docker.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)

## Quick Start

1. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Access the applications:**
   - Customer Frontend: http://localhost
   - Admin Panel: http://localhost/admin
   - Backend API: http://localhost/api
   - Direct Backend: http://localhost:8000/api

3. **Stop all services:**
   ```bash
   docker-compose down
   ```

## Services

The docker-compose.yml includes the following services:

- **db**: PostgreSQL database
- **backend**: Django REST API (Gunicorn)
- **admin-panel**: React admin panel (Nginx)
- **customer-frontend**: React customer frontend (Nginx)
- **nginx**: Reverse proxy for all services

## Environment Variables

You can customize the database connection by setting these environment variables in docker-compose.yml:

- `DB_NAME`: Database name (default: grocerystore)
- `DB_USER`: Database user (default: groceryuser)
- `DB_PASSWORD`: Database password (default: grocerypass)
- `DB_HOST`: Database host (default: db)
- `DB_PORT`: Database port (default: 5432)

## Initial Setup

After starting the containers:

1. **Create a store manager account:**
   ```bash
   docker-compose exec backend python manage.py create_store_manager --username admin --password admin123
   ```

2. **Access the admin panel** at http://localhost/admin and log in with the credentials above.

## Development

For development, you can mount volumes to see changes in real-time:

```yaml
volumes:
  - ./backend:/app
  - ./admin-panel:/app
  - ./customer-frontend:/app
```

## Production Deployment

For production, ensure:

1. Change `SECRET_KEY` in docker-compose.yml
2. Set `DEBUG=0`
3. Use environment variables for sensitive data
4. Set up SSL certificates for HTTPS
5. Configure proper CORS settings
6. Use a managed database service (AWS RDS, etc.)

## Troubleshooting

- **Database connection errors**: Wait for the db service to be healthy before backend starts
- **Port conflicts**: Change port mappings in docker-compose.yml
- **Build errors**: Run `docker-compose build --no-cache` to rebuild from scratch

