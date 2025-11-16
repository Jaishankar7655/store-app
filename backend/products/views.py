from rest_framework import generics, viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from django.db.models import Q, Count, Sum
from django.utils import timezone
from .models import Category, Product, PromoCode
from .serializers import (
    CategorySerializer, ProductSerializer, ProductCreateUpdateSerializer,
    PromoCodeSerializer, PromoCodeApplySerializer
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        queryset = Category.objects.all()
        if self.request.user.is_authenticated and self.request.user.is_store_manager:
            return queryset
        return queryset


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ProductCreateUpdateSerializer
        return ProductSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        queryset = Product.objects.select_related('category').all()
        
        # Filters for customers
        category = self.request.query_params.get('category', None)
        sort_by = self.request.query_params.get('sort_by', None)
        search = self.request.query_params.get('search', None)
        
        if category:
            queryset = queryset.filter(category__name__icontains=category)
        
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(description__icontains=search)
            )
        
        # Most popular = most sold
        if sort_by == 'popular':
            queryset = queryset.annotate(
                sold_count=Count('orderitem')
            ).order_by('-sold_count', '-created_at')
        elif sort_by == 'price_low':
            queryset = queryset.order_by('price')
        elif sort_by == 'price_high':
            queryset = queryset.order_by('-price')
        else:
            queryset = queryset.order_by('-created_at')
        
        return queryset
    
    def perform_create(self, serializer):
        if not self.request.user.is_store_manager:
            raise permissions.PermissionDenied("Only store managers can create products")
        serializer.save()
    
    def perform_update(self, serializer):
        if not self.request.user.is_store_manager:
            raise permissions.PermissionDenied("Only store managers can update products")
        serializer.save()
    
    def perform_destroy(self, instance):
        if not self.request.user.is_store_manager:
            raise permissions.PermissionDenied("Only store managers can delete products")
        instance.delete()


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def low_stock_products(request):
    if not request.user.is_store_manager:
        return Response({'error': 'Only store managers can view low stock alerts'}, 
                       status=status.HTTP_403_FORBIDDEN)
    
    threshold = int(request.query_params.get('threshold', 10))
    products = Product.objects.filter(stock_count__lt=threshold).order_by('stock_count')
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


class PromoCodeViewSet(viewsets.ModelViewSet):
    queryset = PromoCode.objects.all()
    serializer_class = PromoCodeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'apply']:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        queryset = PromoCode.objects.all()
        if not self.request.user.is_store_manager and self.action != 'apply':
            queryset = queryset.filter(is_active=True)
        return queryset
    
    def perform_create(self, serializer):
        if not self.request.user.is_store_manager:
            raise permissions.PermissionDenied("Only store managers can create promo codes")
        serializer.save()
    
    def perform_update(self, serializer):
        if not self.request.user.is_store_manager:
            raise permissions.PermissionDenied("Only store managers can update promo codes")
        serializer.save()
    
    def perform_destroy(self, instance):
        if not self.request.user.is_store_manager:
            raise permissions.PermissionDenied("Only store managers can delete promo codes")
        instance.delete()
    
    @action(detail=False, methods=['post'])
    def apply(self, request):
        serializer = PromoCodeApplySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        code = serializer.validated_data['code']
        
        try:
            promo_code = PromoCode.objects.get(code=code)
            if promo_code.is_valid():
                promo_serializer = PromoCodeSerializer(promo_code)
                return Response({
                    'valid': True,
                    'promo_code': promo_serializer.data
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'valid': False,
                    'message': 'Promo code is not valid'
                }, status=status.HTTP_400_BAD_REQUEST)
        except PromoCode.DoesNotExist:
            return Response({
                'valid': False,
                'message': 'Promo code not found'
            }, status=status.HTTP_404_NOT_FOUND)
