# Online Grocery Store

A full-stack grocery store application with an admin panel and customer frontend. Built with Django REST Framework on the backend and React with Vite on the frontend.

## Features

Backend:
- User authentication with JWT tokens and role-based access
- Product and category management
- Shopping cart and order processing
- Wishlist functionality
- Sales reports and analytics
- Discount codes system
- Low stock notifications

Admin Panel:
- Manage products and inventory
- Handle user accounts
- Process and view orders
- Generate sales reports
- Set up discount codes
- Monitor low stock items
- Manage product categories

Customer Frontend:
- Browse and search products with filters
- View detailed product information
- Manage shopping cart
- Place orders with discount codes
- Track order history
- Save items to wishlist

## Tech Stack

Backend:
- Django 4.2.7
- Django REST Framework
- Django REST Framework Simple JWT
- Django CORS Headers
- SQLite for development

Frontend:
- React 18.3.1
- Vite 7.2.2
- React Router DOM 6.26.2
- Tailwind CSS 3.4.14
- Axios 1.7.7
- Poppins font

## Requirements

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

## Server

The application is deployed on IP: 135.13.9.61

URLs:
- Customer Store: http://135.13.9.61/
- Admin Panel: http://135.13.9.61/admin
- Backend API: http://135.13.9.61:8000/api

Also deployed on Azure App Service.

See DEPLOYMENT.md for more information.

## Getting Started

### Backend Setup

First, set up the Django backend:

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- Mac/Linux: `source venv/bin/activate`

Then install dependencies and run migrations:
```bash
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

The API will be available at http://localhost:8000

### Admin Panel

Navigate to the admin-panel folder:
```bash
cd admin-panel
npm install
npm run dev
```

Access at http://localhost:3000

### Customer Frontend

Navigate to the customer-frontend folder:
```bash
cd customer-frontend
npm install
npm run dev
```

Access at http://localhost:5173

## Project Structure

backend/ - Django REST API
- grocery_store/: Django project settings
- users/: Authentication and user management
- products/: Products and categories
- cart/: Shopping cart
- orders/: Orders and sales reports
- wishlist/: Wishlist feature

admin-panel/ - React admin interface
- src/components/: UI components
- src/context/: Auth context
- src/pages/: Admin pages
- src/utils/: Helper functions

customer-frontend/ - React customer site
- src/components/: UI components
- src/context/: Auth context
- src/pages/: Customer pages
- src/utils/: Helper functions

## User Roles

Customer:
- Browse and search products
- Add items to cart
- Place orders
- View order history
- Save items to wishlist

Store Manager:
- Manage all products and categories
- View and process orders
- Manage user accounts
- Generate sales reports
- Set up discount codes
- Monitor inventory levels

## API Endpoints

Authentication:
- POST /api/auth/register/ - Register user
- POST /api/auth/login/ - Login
- POST /api/auth/token/refresh/ - Refresh token
- GET /api/auth/profile/ - Get profile

Products:
- GET /api/products/products/ - List all products
- GET /api/products/products/{id}/ - Get product details
- POST /api/products/products/ - Add product (admin only)
- PUT /api/products/products/{id}/ - Update product (admin only)
- DELETE /api/products/products/{id}/ - Delete product (admin only)
- GET /api/products/categories/ - List categories
- GET /api/products/low-stock/ - Low stock items (admin only)

Cart:
- GET /api/cart/ - View cart
- POST /api/cart/ - Add to cart
- PUT /api/cart/items/{id}/ - Update quantity
- DELETE /api/cart/items/{id}/ - Remove from cart
- DELETE /api/cart/clear/ - Clear cart

Orders:
- GET /api/orders/orders/ - View orders
- POST /api/orders/checkout/ - Create order
- GET /api/orders/sales-report/ - Sales report (admin only)

Wishlist:
- GET /api/wishlist/ - View wishlist
- POST /api/wishlist/ - Add to wishlist
- DELETE /api/wishlist/items/{id}/ - Remove from wishlist

Discounts:
- GET /api/products/promo-codes/ - List discount codes
- POST /api/products/promo-codes/ - Create code (admin only)
- POST /api/products/promo-codes/apply/ - Apply discount

## Notes

- Uses SQLite for development, PostgreSQL recommended for production
- Images stored as URLs
- Admin panel requires store manager role
- Low stock threshold is 10 items by default
- Access tokens expire after 1 day
- Refresh tokens expire after 7 days

---

**Happy Shopping! **

