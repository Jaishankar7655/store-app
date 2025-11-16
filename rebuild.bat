@echo off
REM Rebuild script for fixing API URL issue (Windows)
REM This script rebuilds the frontend containers with the correct API URL

echo Stopping all containers...
docker-compose down

echo Rebuilding frontend containers with correct API URL...
docker-compose build --no-cache admin-panel customer-frontend

echo Starting all services...
docker-compose up -d

echo Waiting for services to be ready...
timeout /t 10 /nobreak

echo Checking container status...
docker-compose ps

echo.
echo Rebuild complete!
echo.
echo To verify the API URL is correct, check the browser console.
echo The frontend should now use: http://135.13.9.61:8000/api
echo.
echo View logs with: docker-compose logs -f customer-frontend

