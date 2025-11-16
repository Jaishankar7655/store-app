# Online Grocery Store Application

A complete full-stack e-commerce platform for an online grocery store. This project demonstrates modern web development using Django, React, and cloud deployment.

## Project Overview

This application provides a complete grocery shopping solution with separate interfaces for customers and store managers. It includes user authentication, product management, shopping cart, order processing, inventory tracking, and sales analytics.

## Technology Stack

### Backend
- Django 4.2.7 - Python web framework
- Django REST Framework - REST API development
- Django REST Framework Simple JWT - Token authentication
- Django CORS Headers - Cross-origin resource sharing
- SQLite (development) / PostgreSQL (production)
- Gunicorn - WSGI application server

### Frontend
- React 18.3.1 - UI library
- Vite 7.2.2 - Build tool and development server
- Tailwind CSS 3.4.14 - Utility-first CSS framework
- React Router DOM 6.26.2 - Client-side routing
- Axios 1.7.7 - HTTP client library

### Cloud & Deployment
- Azure App Service - Managed container hosting
- Azure Container Registry - Docker image repository
- Azure App Service Plans - Scalable hosting tier
- Azure Database for PostgreSQL - Managed database
- Azure Blob Storage - File storage service
- Azure Monitor - Application monitoring and diagnostics

### DevOps & Infrastructure
- Docker - Container technology
- Docker Compose - Multi-container orchestration
- Nginx - Web server and reverse proxy
- Git - Version control
- GitHub - Code repository
- CI/CD Pipelines - Automated deployment
- Linux Server (Ubuntu) - Production server at 135.13.9.61

## Application Features

### For Customers
- User registration and login
- Browse products with category filters
- Search and filter products by price, popularity
- View detailed product information
- Add items to shopping cart
- Apply discount codes at checkout
- Place orders and track history
- Save items to wishlist
- User profile management

### For Store Managers
- Complete product management (add, edit, delete)
- Inventory and category management
- Process and track customer orders
- User account management
- Sales reports with filters (by date, category, product)
- Discount code management
- Monitor low stock items
- View sales statistics and analytics

### Backend API
- JWT token-based authentication
- Role-based access control
- RESTful API endpoints
- Complete CRUD operations for all resources
- Sales reporting and analytics
- Product recommendations

## Project Structure

```
backend/
├── grocery_store/          - Django project settings
├── users/                  - Authentication and user management
├── products/               - Product and category management
├── cart/                   - Shopping cart functionality
├── orders/                 - Order processing and sales reports
├── wishlist/               - User wishlist feature
└── requirements.txt        - Python dependencies

admin-panel/
├── src/
│   ├── components/         - Reusable React components
│   ├── context/            - Auth context and state
│   ├── pages/              - Admin dashboard pages
│   ├── utils/              - Helper functions
│   └── App.jsx             - Main app component
└── package.json            - Node dependencies

customer-frontend/
├── src/
│   ├── components/         - Reusable React components
│   ├── context/            - Auth context and state
│   ├── pages/              - Customer pages
│   ├── utils/              - Helper functions
│   └── App.jsx             - Main app component
└── package.json            - Node dependencies
```

## Key Technologies & Practices

### Backend Development
- RESTful API design
- JWT authentication for security
- Database migrations for schema management
- Role-based access control (RBAC)
- Error handling and validation
- CORS configuration for cross-origin requests

### Frontend Development
- Component-based architecture
- State management with React Context
- Responsive design with Tailwind CSS
- Client-side routing with React Router
- HTTP requests with Axios
- Form validation and error handling

### DevOps & Infrastructure
- Docker containerization for consistency
- Docker Compose for multi-service orchestration
- Nginx reverse proxy configuration
- Environment-based configuration
- Automated deployment

## Database Schema

The application uses a relational database with the following main entities:

- Users - Customer and admin accounts
- Products - Product catalog with details
- Categories - Product categorization
- Orders - Customer orders with items
- Cart - Shopping cart items
- Wishlist - User saved items
- Promo Codes - Discount codes with validation

## API Endpoints Overview

Authentication:
- POST /api/auth/register/ - User registration
- POST /api/auth/login/ - User login
- POST /api/auth/token/refresh/ - Token refresh
- GET /api/auth/profile/ - Get user profile

Products:
- GET /api/products/products/ - List all products
- GET /api/products/products/{id}/ - Product details
- POST /api/products/products/ - Create product (admin)
- PUT /api/products/products/{id}/ - Update product (admin)
- DELETE /api/products/products/{id}/ - Delete product (admin)
- GET /api/products/categories/ - List categories

Cart & Orders:
- GET /api/cart/ - View shopping cart
- POST /api/cart/ - Add to cart
- PUT /api/cart/items/{id}/ - Update quantity
- DELETE /api/cart/items/{id}/ - Remove from cart
- POST /api/orders/checkout/ - Create order
- GET /api/orders/orders/ - View user orders

Additional Features:
- GET /api/wishlist/ - User wishlist
- POST /api/wishlist/ - Add to wishlist
- GET /api/products/promo-codes/ - Available discount codes
- GET /api/orders/sales-report/ - Sales analytics (admin)
- GET /api/products/low-stock/ - Low stock alerts (admin)

## Deployment

The application is deployed on multiple platforms:

### Direct Server Deployment
- IP: 135.13.9.61
- Uses Docker containers with Nginx reverse proxy
- URLs:
  - Customer Store: http://135.13.9.61/
  - Admin Panel: http://135.13.9.61/admin
  - Backend API: http://135.13.9.61:8000/api

### Azure Cloud Deployment
- Hosted on Azure App Service
- Managed containers
- Auto-scaling capabilities
- Built-in monitoring and diagnostics
- SSL/HTTPS support

## Development Highlights

### Security Features
- JWT token authentication
- Password hashing
- CORS protection
- CSRF token validation
- Role-based authorization
- Input validation and sanitization

### Code Quality
- Modular architecture
- Separation of concerns
- Reusable components
- Proper error handling
- Database transaction management

### Performance Considerations
- Efficient database queries
- Caching strategies
- Response optimization
- API pagination
- Image optimization

## User Roles & Permissions

Customer Role:
- Browse products
- Manage cart and orders
- View order history
- Manage wishlist
- Update profile

Store Manager Role:
- Full product management
- User account management
- Order processing
- Sales reporting
- Discount code management
- Inventory control

## Testing & Quality

- API endpoint testing
- User authentication testing
- Cart and order functionality testing
- Role-based access control testing
- Frontend component testing

## Conclusion

This grocery store application demonstrates a complete, production-ready e-commerce platform using modern web technologies. It includes secure authentication, comprehensive business logic, responsive UI design, and reliable cloud deployment.

---

