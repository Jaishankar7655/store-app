"""
Docker-specific settings for grocery_store project.
Import this in settings.py when running in Docker
"""
import os
from .settings import *

# Override database for Docker
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'grocerystore'),
        'USER': os.environ.get('DB_USER', 'groceryuser'),
        'PASSWORD': os.environ.get('DB_PASSWORD', 'grocerypass'),
        'HOST': os.environ.get('DB_HOST', 'db'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}

# Allowed hosts for Docker
ALLOWED_HOSTS = ['*']

# CORS settings for Docker
CORS_ALLOWED_ORIGINS = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://admin-panel",
    "http://customer-frontend",
    "http://nginx",
]

CORS_ALLOW_CREDENTIALS = True

