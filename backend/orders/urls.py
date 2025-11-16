from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, checkout, sales_report

router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    path('', include(router.urls)),
    path('checkout/', checkout, name='checkout'),
    path('sales-report/', sales_report, name='sales-report'),
]

