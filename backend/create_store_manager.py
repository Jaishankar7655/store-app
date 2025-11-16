"""
Quick script to create a store manager user
Run this with: python create_store_manager.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'grocery_store.settings')
django.setup()

from users.models import User

# Create a store manager
username = 'storemanager'
email = 'manager@grocerystore.com'
password = 'manager123'

if User.objects.filter(username=username).exists():
    print(f'User "{username}" already exists!')
else:
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        role='store_manager',
        is_staff=True,
        is_superuser=False
    )
    print(f'Successfully created store manager!')
    print(f'Username: {username}')
    print(f'Email: {email}')
    print(f'Password: {password}')

