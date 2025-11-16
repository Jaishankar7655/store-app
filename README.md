# Online Grocery Store Application

A full-stack e-commerce platform for online grocery shopping with dedicated interfaces for customers and store managers. This project demonstrates modern web development practices, containerization, and cloud deployment patterns using Azure services.

## Technology Stack

**Backend**
- Django 4.2.7
- Django REST Framework
- PostgreSQL / SQLite

**Frontend**
- React 18.3.1
- Vite 7.2.2
- Tailwind CSS 3.4.14

**DevOps & Infrastructure**
- Docker & Docker Compose
- Nginx (Reverse Proxy)
- Azure App Service
- Azure Container Registry
- Azure Database for PostgreSQL

## Features

**Customer Portal**
- User authentication (registration and login)
- Product browsing with filtering capabilities
- Shopping cart management
- Order placement and order history tracking
- Wishlist functionality
- Discount code application at checkout

**Admin Dashboard**
- Complete product lifecycle management (create, update, delete)
- Inventory tracking and category management
- Order processing and status updates
- Sales analytics and reporting
- Discount code management
- Low stock monitoring and alerts

## Project Architecture

```
backend/
├── grocery_store/    # Django project configuration
├── users/            # User authentication and profile management
├── products/         # Product catalog and category operations
├── cart/             # Shopping cart functionality
├── orders/           # Order processing and sales analytics
└── wishlist/         # User wishlist features

admin-panel/
├── src/              # React-based admin dashboard
└── package.json      # Frontend dependencies

customer-frontend/
├── src/              # React customer-facing store
└── package.json      # Frontend dependencies
```

## API Documentation

**Authentication Endpoints**
- `POST /api/auth/register/` - Create new user account
- `POST /api/auth/login/` - Authenticate existing user

**Product Endpoints**
- `GET /api/products/products/` - Retrieve product catalog
- `GET /api/products/categories/` - Retrieve product categories

**Cart & Order Endpoints**
- `GET /api/cart/` - Retrieve current shopping cart
- `POST /api/orders/checkout/` - Process order checkout
- `GET /api/orders/orders/` - Retrieve user order history

**Admin Endpoints**
- `GET /api/orders/sales-report/` - Generate sales analytics
- `GET /api/products/low-stock/` - Retrieve low inventory alerts

## Local Development Setup

**Prerequisites**
- Docker and Docker Compose installed
- Git

**Steps**

1. Clone the repository:
```bash
git clone https://github.com/Jaishankar7655/store-app.git
cd store-app
```

2. Start the application:
```bash
docker-compose up
```

3. Access the application:
- Customer Store: http://localhost
- Admin Panel: http://localhost/admin
- API: http://localhost:8000/api

## Deployment

**Live Application**
- Customer Store: http://135.13.9.61/
- Admin Panel: http://135.13.9.61/admin/
- API: http://135.13.9.61:8000/api
- Repository: https://github.com/Jaishankar7655/store-app

**Azure Infrastructure**
- Azure App Service for container hosting
- Azure Container Registry for Docker image management
- Azure Database for PostgreSQL for data persistence

## Containerization Strategy

The application uses Docker Compose to orchestrate multiple containers:
- Backend API container running Django
- Frontend containers for customer and admin interfaces
- Nginx reverse proxy for request routing
- PostgreSQL database container

This containerized approach ensures consistent environments across development, testing, and production deployments while optimizing resource utilization.

## Development Focus

This project serves as a practical implementation for:
- Full-stack web application development with Django and React
- RESTful API design and implementation
- Container orchestration with Docker Compose
- Cloud deployment patterns using Azure services
- DevOps practices including CI/CD pipelines
- Infrastructure as Code concepts

## Notes

The Docker Compose setup is optimized for development and testing environments. Production deployments should utilize managed services, proper secrets management, and additional security configurations appropriate for production workloads.