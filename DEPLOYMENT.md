# Deployment Guide

The application is deployed in two places:

1. Direct Server: IP 135.13.9.61
2. Azure App Service

## Direct Server Deployment (135.13.9.61)

### Accessing the Application

Customer Store: http://135.13.9.61/
Admin Panel: http://135.13.9.61/admin
Backend API: http://135.13.9.61:8000/api

## Admin Panel

You can access the admin dashboard at http://135.13.9.61/admin

In the admin panel you can:
- Add and manage products
- Process customer orders
- Manage user accounts
- View sales reports and statistics
- Create discount codes
- Check inventory levels

## Initial Setup

After deployment, you need to open the firewall ports so the application is accessible.

### Firewall Setup

For Ubuntu/Debian:
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 8000/tcp
```

For CentOS/RHEL:
```bash
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --permanent --add-port=8000/tcp
sudo firewall-cmd --reload
```

Ports needed:
- 80: Main web server (Nginx)
- 443: HTTPS/SSL
- 8000: Backend API
- 3000: Admin (optional, if not using Nginx)
- 5173: Customer site (optional, if not using Nginx)

## Running with Docker

Start all services:
```bash
docker-compose up -d --build
```

Check status:
```bash
docker-compose ps
```

View logs:
```bash
docker-compose logs -f
```

To stop everything:
```bash
docker-compose down
```

## Checking Services

Test if backend is working:
```bash
curl http://135.13.9.61:8000/api/products/products/
```

Test if frontend is working:
```bash
curl http://135.13.9.61/
```

Then visit in your browser:
- http://135.13.9.61/ for customer store
- http://135.13.9.61/admin for admin panel

## User Accounts

Store manager accounts are created with admin privileges and can access the admin panel.

You can create additional accounts using the Django management command or through the admin panel if you already have a store manager account.

## Production Setup

These are important settings for production:

### 1. Security Settings

Edit `backend/grocery_store/settings.py`:

```python
DEBUG = False
ALLOWED_HOSTS = ['135.13.9.61', 'yourdomain.com']
SECRET_KEY = 'your-unique-secret-key'
CSRF_TRUSTED_ORIGINS = ['http://135.13.9.61', 'https://yourdomain.com']
```

### 2. Database

For production, switch from SQLite to PostgreSQL:
- Use a strong password
- Only allow localhost connections
- Set up regular backups

### 3. HTTPS/SSL

Install Let's Encrypt certificate:

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d yourdomain.com
```

Then update nginx config with SSL certificate paths.

### 4. Maintenance

Keep these in mind:
- Monitor disk space
- Update Docker images regularly
- Check logs for errors
- Set up automated database backups
- Monitor performance and response times

## Troubleshooting

Admin panel won't load:
- Check if Docker services are running: `docker-compose ps`
- Restart services: `docker-compose restart`
- Check logs: `docker-compose logs backend`

Can't login:
- Verify you have the correct username and password
- Check database connection in logs
- Make sure the user account exists

API returns 401 error:
- Check your authentication token
- Login again to get a new token
- Check backend logs for details

Check all logs:
```bash
docker-compose logs -f
```

Check specific service:
```bash
docker-compose logs backend
docker-compose logs admin-panel
docker-compose logs customer-frontend
```

---

Server: 135.13.9.61
Admin: http://135.13.9.61/admin

## Azure App Service Deployment

The application is also deployed on Microsoft Azure using App Service containers.

### Azure Access

Azure App Service provides:
- Managed hosting for the Docker containers
- Automatic scaling
- Built-in monitoring and diagnostics
- SSL/HTTPS support
- Easy deployment pipeline

### Deploying to Azure

1. Create Azure Container Registry:
```bash
az acr create --resource-group myGroup --name storeregistry --sku Basic
```

2. Build and push Docker image:
```bash
docker build -t storeregistry.azurecr.io/store:latest .
az acr build --registry storeregistry --image store:latest .
```

3. Create App Service Plan:
```bash
az appservice plan create --name storePlan --resource-group myGroup --sku B1 --is-linux
```

4. Create Web App:
```bash
az webapp create --resource-group myGroup --plan storePlan --name storeapp --deployment-container-image-name-user storeregistry.azurecr.io/store:latest
```

5. Configure environment variables:
```bash
az webapp config appsettings set --resource-group myGroup --name storeapp --settings DEBUG=False SECRET_KEY=your-key
```

6. Enable continuous deployment from container registry:
```bash
az webapp deployment container config --name storeapp --resource-group myGroup --enable-cd true
```

### Azure Benefits

- High availability and reliability
- Automatic backups
- Easy scaling up or down
- Integrated monitoring
- CDN support for static files
- Built-in SSL certificates

### Monitoring on Azure

Check application logs:
```bash
az webapp log tail --resource-group myGroup --name storeapp
```

View metrics:
- Go to Azure Portal
- Navigate to App Service
- Check Metrics blade for CPU, memory, requests

### Connecting to Azure Database

For production, use Azure Database for PostgreSQL:
- Managed service
- Automatic backups
- High availability
- Security built-in

Update Django settings with Azure database connection string.

---

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

