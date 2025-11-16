# Project Information

## About This Project

This is a full-stack e-commerce application for an online grocery store. The project demonstrates modern web development practices with a complete REST API backend and responsive user interfaces.

## Technologies Used

### Backend
- Django 4.2.7 - Python web framework
- Django REST Framework - REST API development
- JWT Authentication - Secure token-based authentication
- SQLite/PostgreSQL - Database management
- Docker - Containerization

### Frontend
- React 18.3.1 - JavaScript library for UI
- Vite 7.2.2 - Modern build tool
- Tailwind CSS 3.4.14 - Utility-first CSS framework
- React Router 6.26.2 - Client-side routing
- Axios 1.7.7 - HTTP client

### Infrastructure
- Nginx - Web server and reverse proxy
- Docker & Docker Compose - Container orchestration
- Deployed on Azure App Service and direct Linux server

## Application Components

The application consists of three main parts:

1. Backend API (Django)
   - User authentication and authorization
   - Product management
   - Order processing
   - Shopping cart management
   - Sales reporting

2. Admin Panel (React)
   - Dashboard for store managers
   - Product and inventory management
   - Order management
   - User management
   - Sales analytics

3. Customer Frontend (React)
   - Public store interface
   - Product browsing and search
   - Shopping cart
   - Checkout process
   - Order history

## Database Structure

The application uses a relational database with the following main tables:
- Users - Customer and admin accounts
- Products - Product catalog
- Categories - Product categories
- Orders - Customer orders
- Cart Items - Shopping cart contents
- Wishlist Items - User wishlists
- Promo Codes - Discount codes

## Key Features Implemented

- User authentication with JWT tokens
- Role-based access control (Customer vs Store Manager)
- Product catalog with categories
- Shopping cart with session management
- Complete order processing
- Sales reports and analytics
- Discount code system
- Wishlist functionality
- Low stock alerts
- Responsive design for mobile and desktop

## Deployment Platforms

1. Direct Server Deployment
   - IP: 135.13.9.61
   - Uses Docker containers with Nginx reverse proxy

2. Azure App Service
   - Managed hosting with automatic scaling
   - Integrated monitoring and diagnostics
   - Built-in SSL/HTTPS support

## Development Tools & Practices

- Version control with Git
- Docker for consistent environments
- RESTful API design principles
- React component-based architecture
- Tailwind CSS for styling
- JWT for authentication security

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

