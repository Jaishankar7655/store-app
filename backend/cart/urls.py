from django.urls import path
from .views import cart_detail, cart_item_detail, cart_clear

urlpatterns = [
    path('', cart_detail, name='cart'),
    path('clear/', cart_clear, name='cart-clear'),
    path('items/<int:item_id>/', cart_item_detail, name='cart-item'),
]

