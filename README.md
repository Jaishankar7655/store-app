# Online Grocery Store Application

A full-stack e-commerce grocery store application with separate admin and customer interfaces. Built with Django REST Framework backend and React frontend.

## Project Overview

This is a complete grocery store platform that allows customers to browse and purchase products online, while store managers can manage inventory, orders, and generate sales reports.

## Technology Stack

Backend:
- Django 4.2.7 - Web framework
- Django REST Framework - REST API
- JWT Authentication - Secure user authentication
- SQLite/PostgreSQL - Database
- Nginx - Reverse proxy

Frontend:
- React 18.3.1 - UI library
- Vite 7.2.2 - Build tool
- Tailwind CSS 3.4.14 - Styling
- React Router - Navigation
- Axios - HTTP client

## Key Features

Admin Panel:
- Product and inventory management
- Order processing and tracking
- User account management
- Sales reports and analytics
- Discount code management
- Low stock monitoring

Customer Store:
- Product browsing with filters
- Shopping cart management
- Order checkout with discounts
- Order history tracking
- Wishlist functionality
- User account management

Backend API:
- JWT token-based authentication
- Role-based access control
- Complete product management API
- Order processing API
- Shopping cart API
- Sales reporting API

## Project Structure

backend/ - Django REST API
- users/ - User authentication and management
- products/ - Product and category management
- cart/ - Shopping cart functionality
- orders/ - Order processing and sales reports
- wishlist/ - User wishlist feature

admin-panel/ - React admin dashboard
- Components, pages, and utilities for managing the store

customer-frontend/ - React customer store
- Components, pages, and utilities for customers

## Deployment

The application is deployed on:
- Direct Server: 135.13.9.61
- Azure App Service

## Database

Uses SQLite for development and PostgreSQL for production with proper security and backup configurations.

---

