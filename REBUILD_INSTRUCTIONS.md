# Rebuild Instructions - Fix API URL Issue

The frontend applications need to be rebuilt with the correct API URL environment variable. Vite requires environment variables at **build time**, not runtime.

## Problem
The frontend is trying to connect to `http://localhost:8000/api` instead of `http://135.13.9.61:8000/api` because the environment variable wasn't available during the build process.

## Solution
Rebuild the frontend containers with build arguments:

```bash
# Stop all containers
docker-compose down

# Rebuild frontend containers with the correct API URL
docker-compose build --no-cache admin-panel customer-frontend

# Start all services
docker-compose up -d

# Check logs to verify
docker-compose logs -f customer-frontend
docker-compose logs -f admin-panel
```

## Alternative: Rebuild Everything

If you want to rebuild everything from scratch:

```bash
# Stop and remove all containers and volumes (WARNING: This will delete your database!)
docker-compose down -v

# Rebuild all services
docker-compose build --no-cache

# Start all services
docker-compose up -d

# Create store manager account
docker-compose exec backend python manage.py create_store_manager \
  --username admin \
  --email admin@grocerystore.com \
  --password admin123
```

## Verify the Fix

1. Open browser developer tools (F12)
2. Go to Network tab
3. Try to register a user at `http://135.13.9.61/register`
4. Check the request URL - it should be `http://135.13.9.61:8000/api/auth/register/` or `http://135.13.9.61/api/auth/register/`
5. It should NOT be `http://localhost:8000/api/auth/register/`

## What Changed

1. **Dockerfiles**: Now accept `VITE_API_URL` as a build argument
2. **docker-compose.yml**: Passes `VITE_API_URL` as a build argument instead of runtime environment variable
3. **Nginx config**: Fixed admin panel asset routing

The API URL is now baked into the JavaScript bundle during the build process, which is how Vite works.

