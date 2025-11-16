from django.urls import path
from .views import wishlist_detail, wishlist_item_delete

urlpatterns = [
    path('', wishlist_detail, name='wishlist'),
    path('items/<int:item_id>/', wishlist_item_delete, name='wishlist-item-delete'),
]

