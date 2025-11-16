from rest_framework import serializers
from .models import Category, Product, PromoCode


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'description')


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    is_low_stock = serializers.BooleanField(read_only=True)
    total_sold = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'category', 'category_name', 'price', 
                  'stock_count', 'image_url', 'is_low_stock', 'total_sold', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at', 'total_sold')


class ProductCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('name', 'description', 'category', 'price', 'stock_count', 'image_url')


class PromoCodeSerializer(serializers.ModelSerializer):
    is_valid = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = PromoCode
        fields = ('id', 'code', 'discount_percentage', 'discount_amount', 'is_active', 
                  'valid_from', 'valid_to', 'usage_limit', 'used_count', 'is_valid', 'created_at')
        read_only_fields = ('used_count', 'created_at')


class PromoCodeApplySerializer(serializers.Serializer):
    code = serializers.CharField(max_length=50)

