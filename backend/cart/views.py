from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from products.models import Product


@api_view(['GET', 'POST'])
def cart_detail(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    
    if request.method == 'GET':
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))
        
        try:
            product = Product.objects.get(id=product_id)
            
            if product.stock_count < quantity:
                return Response(
                    {'error': f'Only {product.stock_count} items available in stock'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            cart_item, created = CartItem.objects.get_or_create(
                cart=cart,
                product=product,
                defaults={'quantity': quantity}
            )
            
            if not created:
                new_quantity = cart_item.quantity + quantity
                if new_quantity > product.stock_count:
                    return Response(
                        {'error': f'Only {product.stock_count} items available in stock'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                cart_item.quantity = new_quantity
                cart_item.save()
            
            serializer = CartSerializer(cart)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT', 'DELETE'])
def cart_item_detail(request, item_id):
    try:
        cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)
    except CartItem.DoesNotExist:
        return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        quantity = int(request.data.get('quantity', 1))
        
        if quantity > cart_item.product.stock_count:
            return Response(
                {'error': f'Only {cart_item.product.stock_count} items available in stock'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        cart_item.quantity = quantity
        cart_item.save()
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data)
    
    elif request.method == 'DELETE':
        cart_item.delete()
        cart = Cart.objects.get(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def cart_clear(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    cart.items.all().delete()
    serializer = CartSerializer(cart)
    return Response(serializer.data, status=status.HTTP_200_OK)
