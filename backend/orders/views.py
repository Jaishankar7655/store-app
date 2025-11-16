from rest_framework import generics, viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Sum, Count, Q
from decimal import Decimal
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderCreateSerializer
from cart.models import Cart, CartItem
from products.models import PromoCode


class OrderViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_store_manager:
            return Order.objects.prefetch_related('items__product').all()
        return Order.objects.prefetch_related('items__product').filter(user=user)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def checkout(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    
    if not cart.items.exists():
        return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Validate stock availability
    for item in cart.items.all():
        if item.quantity > item.product.stock_count:
            return Response(
                {'error': f'Insufficient stock for {item.product.name}'},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    # Create order
    shipping_address = request.data.get('shipping_address', '')
    notes = request.data.get('notes', '')
    promo_code_id = request.data.get('promo_code', None)
    
    order = Order.objects.create(
        user=request.user,
        shipping_address=shipping_address,
        notes=notes
    )
    
    # Apply promo code if provided
    promo_code = None
    discount = Decimal('0.00')
    if promo_code_id:
        try:
            promo_code = PromoCode.objects.get(id=promo_code_id)
            if promo_code.is_valid():
                order.promo_code = promo_code
                promo_code.used_count += 1
                promo_code.save()
            else:
                promo_code = None
        except PromoCode.DoesNotExist:
            pass
    
    # Create order items and calculate totals
    subtotal = Decimal('0.00')
    for cart_item in cart.items.all():
        product = cart_item.product
        price = product.price
        quantity = cart_item.quantity
        
        OrderItem.objects.create(
            order=order,
            product=product,
            quantity=quantity,
            price=price,
            subtotal=price * quantity
        )
        
        # Update stock
        product.stock_count -= quantity
        product.save()
        
        subtotal += price * quantity
    
    # Calculate discount
    if promo_code:
        if promo_code.discount_percentage > 0:
            discount = (subtotal * promo_code.discount_percentage) / 100
        elif promo_code.discount_amount > 0:
            discount = promo_code.discount_amount
    
    total = subtotal - discount
    
    order.subtotal = subtotal
    order.discount = discount
    order.total = total
    order.save()
    
    # Clear cart
    cart.items.all().delete()
    
    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def sales_report(request):
    if not request.user.is_store_manager:
        return Response({'error': 'Only store managers can view sales reports'}, 
                       status=status.HTTP_403_FORBIDDEN)
    
    filter_type = request.query_params.get('filter', 'all')  # most_sold, least_sold, by_category
    category_id = request.query_params.get('category', None)
    
    # Get all products with sales data
    products = OrderItem.objects.values('product').annotate(
        total_quantity=Sum('quantity'),
        total_revenue=Sum('subtotal'),
        order_count=Count('order', distinct=True)
    ).select_related('product')
    
    # Apply category filter
    if category_id:
        products = products.filter(product__category_id=category_id)
    
    # Build response data
    product_list = []
    for item in products:
        from products.models import Product
        try:
            product = Product.objects.get(id=item['product'])
            product_list.append({
                'product_id': product.id,
                'product_name': product.name,
                'category': product.category.name,
                'total_quantity_sold': item['total_quantity'],
                'total_revenue': float(item['total_revenue']),
                'number_of_orders': item['order_count'],
            })
        except Product.DoesNotExist:
            continue
    
    # Apply sorting based on filter
    if filter_type == 'most_sold':
        product_list.sort(key=lambda x: x['total_quantity_sold'], reverse=True)
    elif filter_type == 'least_sold':
        product_list.sort(key=lambda x: x['total_quantity_sold'])
    
    # Calculate summary
    total_items_sold = sum(item['total_quantity_sold'] for item in product_list)
    total_revenue = sum(item['total_revenue'] for item in product_list)
    total_orders = Order.objects.count()
    
    return Response({
        'filter': filter_type,
        'summary': {
            'total_items_sold': total_items_sold,
            'total_revenue': total_revenue,
            'total_orders': total_orders,
            'products_count': len(product_list)
        },
        'products': product_list
    }, status=status.HTTP_200_OK)
