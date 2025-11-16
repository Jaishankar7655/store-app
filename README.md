# Online Grocery Store Application

> **📌 Important Note:** This project has all components (database, frontend, and backend) containerized in Docker using Docker Compose for smooth development and testing. Docker containerization was used to optimize resource usage and ensure smooth deployment. This setup is **not recommended for production use**. This project is primarily for **Azure and DevOps practice** where I am working on cloud deployment patterns and infrastructure management.

A full-stack e-commerce platform for an online grocery store with separate interfaces for customers and store managers.

## Technology Stack

### Backend
- Django 4.2.7
- Django REST Framework
- PostgreSQL / SQLite

### Frontend
- React 18.3.1
- Vite 7.2.2
- Tailwind CSS 3.4.14

### DevOps & Containerization
- Docker & Docker Compose
- Nginx
- Azure (App Service, Container Registry, Database for PostgreSQL)

## Application Features

### For Customers
- User registration and login
- Browse and filter products
- Shopping cart management
- Order placement and tracking
- Wishlist functionality
- Discount code application

### For Store Managers
- Product management (add, edit, delete)
- Inventory and category management
- Order processing and tracking
- Sales reports and analytics
- Discount code management
- Low stock monitoring

## Project Structure

```
backend/
├── grocery_store/    - Django settings and configuration
├── users/            - Authentication and user management
├── products/         - Product and category management
├── cart/             - Shopping cart functionality
├── orders/           - Order processing and sales reports
└── wishlist/         - User wishlist feature

admin-panel/
├── src/              - React admin dashboard
└── package.json      - Dependencies

customer-frontend/
├── src/              - React customer store
└── package.json      - Dependencies
```

## Setup & Running with Docker

1. Clone the repository
2. Ensure Docker and Docker Compose are installed
3. Run: `docker-compose up`
4. Access:
   - Customer Store: http://localhost:3000
   - Admin Panel: http://localhost:3001
   - Backend API: http://localhost:8000/api

## API Endpoints

**Authentication:**
- POST `/api/auth/register/` - User registration
- POST `/api/auth/login/` - User login

**Products:**
- GET `/api/products/products/` - List all products
- GET `/api/products/categories/` - List categories

**Cart & Orders:**
- GET `/api/cart/` - View shopping cart
- POST `/api/orders/checkout/` - Create order
- GET `/api/orders/orders/` - View user orders

**Admin Features:**
- `/api/orders/sales-report/` - Sales analytics
- `/api/products/low-stock/` - Low stock alerts

## Deployment

Currently deployed and practiced on:
- **Azure App Service** - Container hosting and management
- **Azure Container Registry** - Docker image storage
- **Azure Database for PostgreSQL** - Managed database service

This project serves as a learning platform for Azure DevOps and cloud deployment practices.