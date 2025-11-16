from rest_framework import serializers
from products.serializers import ProductSerializer
from .models import Wishlist, WishlistItem


class WishlistItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = WishlistItem
        fields = ('id', 'product', 'product_id', 'created_at')
        read_only_fields = ('created_at',)


class WishlistSerializer(serializers.ModelSerializer):
    items = WishlistItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Wishlist
        fields = ('id', 'items', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')

