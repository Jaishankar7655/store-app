from rest_framework import serializers
from products.serializers import ProductSerializer
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'product_name', 'quantity', 'price', 'subtotal')


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user_username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Order
        fields = ('id', 'order_number', 'user', 'user_username', 'status', 'items', 
                  'subtotal', 'discount', 'total', 'purchase_date', 'shipping_address', 
                  'notes', 'promo_code')
        read_only_fields = ('order_number', 'purchase_date', 'subtotal', 'discount', 'total')


class OrderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('shipping_address', 'notes', 'promo_code')

