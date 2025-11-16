from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet, ProductViewSet, PromoCodeViewSet, low_stock_products
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')
router.register(r'promo-codes', PromoCodeViewSet, basename='promocode')

urlpatterns = [
    path('', include(router.urls)),
    path('low-stock/', low_stock_products, name='low-stock'),
]

