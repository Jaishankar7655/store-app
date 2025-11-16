# Deployment Guide - Public IP: 135.13.9.61

This guide explains how to deploy and access the grocery store application using your public IP address.

## Server Configuration

Your application is configured to run on public IP: **135.13.9.61**

## Access URLs

After deployment, you can access the services via:

### Option 1: Using Nginx Reverse Proxy (Port 80)
- **Customer Frontend**: `http://135.13.9.61/`
- **Admin Panel**: `http://135.13.9.61/admin`
- **Backend API**: `http://135.13.9.61/api`

### Option 2: Direct Port Access
- **Customer Frontend**: `http://135.13.9.61:5173`
- **Admin Panel**: `http://135.13.9.61:3000`
- **Backend API**: `http://135.13.9.61:8000/api`

## Deployment Steps

### 1. Ensure Firewall Rules

Make sure these ports are open in your server firewall:
- Port 80 (HTTP - Nginx)
- Port 443 (HTTPS - if using SSL)
- Port 3000 (Admin Panel - optional)
- Port 5173 (Customer Frontend - optional)
- Port 8000 (Backend API - optional)
- Port 5432 (PostgreSQL - should be internal only)

**Ubuntu/Debian:**
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3000/tcp
sudo ufw allow 5173/tcp
sudo ufw allow 8000/tcp
```

**CentOS/RHEL:**
```bash
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --permanent --add-port=5173/tcp
sudo firewall-cmd --permanent --add-port=8000/tcp
sudo firewall-cmd --reload
```

### 2. Deploy with Docker

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Check service status
docker-compose ps
```

### 3. Create Store Manager Account

```bash
docker-compose exec backend python manage.py create_store_manager \
  --username admin \
  --email admin@grocerystore.com \
  --password your_secure_password
```

### 4. Verify Deployment

- Check backend: `curl http://135.13.9.61:8000/api/products/products/`
- Check customer frontend: Open `http://135.13.9.61:5173` in browser
- Check admin panel: Open `http://135.13.9.61:3000` in browser

## Production Recommendations

### 1. Security Settings

Update `backend/grocery_store/settings.py`:
```python
DEBUG = False
ALLOWED_HOSTS = ['135.13.9.61', 'yourdomain.com']
SECRET_KEY = 'your-secret-key-here'  # Generate a new one!
```

### 2. SSL/HTTPS Setup

For production, set up SSL certificates:

1. Install Certbot:
```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
```

2. Get SSL certificate:
```bash
sudo certbot --nginx -d 135.13.9.61
```

3. Update CORS settings to include HTTPS:
```python
CORS_ALLOWED_ORIGINS = [
    "https://135.13.9.61",
    "https://135.13.9.61:443",
]
```

### 3. Database Security

- Change default PostgreSQL password
- Restrict database port (5432) to internal network only
- Use strong passwords for all services

### 4. Environment Variables

Create a `.env` file for sensitive data:
```env
SECRET_KEY=your-secret-key
DB_PASSWORD=strong-database-password
DEBUG=False
```

### 5. Monitoring

Set up monitoring for:
- Container health
- Database performance
- API response times
- Disk space usage

## Troubleshooting

### Cannot access from public IP

1. Check firewall rules
2. Verify Docker ports are exposed: `docker-compose ps`
3. Check server logs: `docker-compose logs backend`
4. Test locally first: `curl http://localhost:8000/api/products/products/`

### CORS Errors

- Verify IP is in `CORS_ALLOWED_ORIGINS` in settings.py
- Check browser console for specific error
- Ensure backend is accessible: `curl http://135.13.9.61:8000/api/products/products/`

### Database Connection Issues

- Verify database is running: `docker-compose ps db`
- Check database logs: `docker-compose logs db`
- Ensure environment variables are set correctly

## Maintenance Commands

```bash
# Stop all services
docker-compose down

# Restart all services
docker-compose restart

# View logs
docker-compose logs -f [service_name]

# Update and rebuild
docker-compose pull
docker-compose up -d --build

# Backup database
docker-compose exec db pg_dump -U groceryuser grocerystore > backup.sql

# Restore database
docker-compose exec -T db psql -U groceryuser grocerystore < backup.sql
```

## Support

For issues, check:
- Docker logs: `docker-compose logs`
- Service status: `docker-compose ps`
- Network connectivity: `curl http://135.13.9.61:8000/api/products/products/`

