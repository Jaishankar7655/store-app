# Online Grocery Store - Full Stack Application

A comprehensive grocery store application with separate admin panel and customer frontend, built with Django REST Framework backend and React + Vite frontend.

## 🎯 Features

### Backend (Django REST Framework)
- JWT-based authentication with role-based access control (Customer & Store Manager)
- User registration and login
- Product management (CRUD operations)
- Category management
- Shopping cart functionality
- Order processing and management
- Wishlist feature
- Sales reports with filtering (most sold, least sold, by category)
- Promo code/discount system
- Low stock alerts

### Admin Panel (React + Vite + Tailwind)
- User management (Create, Edit, Delete users)
- Product management (Add, Edit, Delete products)
- Category management
- Order viewing and management
- Sales reports with filters
- Promo code management
- Low stock alerts

### Customer Frontend (React + Vite + Tailwind)
- User registration and login
- Product browsing with filters (category, popular, price)
- Product detail view
- Shopping cart management
- Checkout with promo code support
- Wishlist functionality
- Order history

## 🛠️ Tech Stack

### Backend
- Django 4.2.7
- Django REST Framework
- Django REST Framework Simple JWT
- Django CORS Headers
- SQLite (Development)

### Frontend
- React 18.3.1
- Vite 7.2.2
- React Router DOM 6.26.2
- Tailwind CSS 3.4.14
- Axios 1.7.7
- Poppins Font

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

## 🌐 Public Deployment

The application is configured for public deployment on IP: **135.13.9.61**

**Access URLs:**
- Customer Frontend: `http://135.13.9.61:5173` or `http://135.13.9.61/`
- Admin Panel: `http://135.13.9.61:3000` or `http://135.13.9.61/admin`
- Backend API: `http://135.13.9.61:8000/api`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🚀 Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
   - On Windows:
   ```bash
   venv\Scripts\activate
   ```
   - On macOS/Linux:
   ```bash
   source venv/bin/activate
   ```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

6. Create a superuser (optional, for Django admin):
```bash
python manage.py createsuperuser
```

7. Run the development server:
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

### Admin Panel Setup

1. Navigate to the admin-panel directory:
```bash
cd admin-panel
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The admin panel will be available at `http://localhost:3000`

### Customer Frontend Setup

1. Navigate to the customer-frontend directory:
```bash
cd customer-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The customer frontend will be available at `http://localhost:5173`

## 📁 Project Structure

```
store/
├── backend/
│   ├── grocery_store/          # Django project settings
│   ├── users/                   # User authentication app
│   ├── products/                # Products & categories app
│   ├── cart/                    # Shopping cart app
│   ├── orders/                  # Orders & sales reports app
│   ├── wishlist/                # Wishlist app
│   ├── manage.py
│   └── requirements.txt
├── admin-panel/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── context/             # Auth context
│   │   ├── pages/               # Page components
│   │   ├── utils/               # Utility functions
│   │   └── App.jsx
│   └── package.json
├── customer-frontend/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── context/             # Auth context
│   │   ├── pages/               # Page components
│   │   ├── utils/               # Utility functions
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 🔐 Authentication

### User Roles

1. **Customer**: Can browse products, add to cart, checkout, and manage wishlist
2. **Store Manager**: Can manage users, products, categories, view sales reports, and manage promo codes

### Creating a Store Manager

Store managers can be created through the admin panel after logging in with an existing store manager account, or through the Django admin interface.

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register/` - Register a new user
- `POST /api/auth/login/` - Login
- `POST /api/auth/token/refresh/` - Refresh JWT token
- `GET /api/auth/profile/` - Get user profile

### Products
- `GET /api/products/products/` - List products (with filters)
- `GET /api/products/products/{id}/` - Get product details
- `POST /api/products/products/` - Create product (Store Manager only)
- `PUT /api/products/products/{id}/` - Update product (Store Manager only)
- `DELETE /api/products/products/{id}/` - Delete product (Store Manager only)
- `GET /api/products/categories/` - List categories
- `GET /api/products/low-stock/` - Get low stock products (Store Manager only)

### Cart
- `GET /api/cart/` - Get cart items
- `POST /api/cart/` - Add item to cart
- `PUT /api/cart/items/{id}/` - Update cart item quantity
- `DELETE /api/cart/items/{id}/` - Remove item from cart
- `DELETE /api/cart/clear/` - Clear cart

### Orders
- `GET /api/orders/orders/` - List orders
- `POST /api/orders/checkout/` - Create order from cart
- `GET /api/orders/sales-report/` - Get sales report (Store Manager only)

### Wishlist
- `GET /api/wishlist/` - Get wishlist items
- `POST /api/wishlist/` - Add item to wishlist
- `DELETE /api/wishlist/items/{id}/` - Remove item from wishlist

### Promo Codes
- `GET /api/products/promo-codes/` - List promo codes
- `POST /api/products/promo-codes/` - Create promo code (Store Manager only)
- `POST /api/products/promo-codes/apply/` - Apply promo code

## 🎨 Design

The application uses:
- **Poppins** font family throughout
- **Tailwind CSS** for styling
- **Responsive design** for mobile and desktop
- **Professional color scheme** with primary blue tones

## 🔧 Configuration

### Backend CORS Settings
CORS is configured to allow requests from:
- `http://localhost:3000` (Admin Panel)
- `http://localhost:5173` (Customer Frontend)

### JWT Token Settings
- Access token lifetime: 1 day
- Refresh token lifetime: 7 days

## 🧪 Testing

To test the application:

1. **Create a Store Manager account** (via admin panel or Django admin)
2. **Login to Admin Panel** and manage products, categories, and view sales reports
3. **Create a Customer account** on the customer frontend
4. **Browse products, add to cart, and checkout**

## 📝 Notes

- The application uses SQLite for development. For production, consider using PostgreSQL or MySQL.
- All images are stored as URLs. For production, consider implementing file upload functionality.
- The admin panel requires store manager role to access all features.
- Low stock threshold is set to 10 items by default (configurable in admin panel).

## 🤝 Contributing

This is a project for learning and demonstration purposes. Feel free to fork and modify as needed.

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Developed as a full-stack grocery store application with Django and React.

---

**Happy Shopping! 🛒**

