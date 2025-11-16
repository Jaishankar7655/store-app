from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Wishlist, WishlistItem
from .serializers import WishlistSerializer, WishlistItemSerializer
from products.models import Product


@api_view(['GET', 'POST'])
def wishlist_detail(request):
    wishlist, created = Wishlist.objects.get_or_create(user=request.user)
    
    if request.method == 'GET':
        serializer = WishlistSerializer(wishlist)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        product_id = request.data.get('product_id')
        
        try:
            product = Product.objects.get(id=product_id)
            
            wishlist_item, created = WishlistItem.objects.get_or_create(
                wishlist=wishlist,
                product=product
            )
            
            if created:
                serializer = WishlistItemSerializer(wishlist_item)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(
                    {'error': 'Product already in wishlist'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
def wishlist_item_delete(request, item_id):
    try:
        wishlist_item = WishlistItem.objects.get(id=item_id, wishlist__user=request.user)
        wishlist_item.delete()
        wishlist = Wishlist.objects.get(user=request.user)
        serializer = WishlistSerializer(wishlist)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except WishlistItem.DoesNotExist:
        return Response({'error': 'Wishlist item not found'}, status=status.HTTP_404_NOT_FOUND)
