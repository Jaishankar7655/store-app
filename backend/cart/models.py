from django.db import models
from django.db.models import Sum
from users.models import User
from products.models import Product


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cart')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Cart for {self.user.username}"
    
    @property
    def total_items(self):
        return self.items.aggregate(total=Sum('quantity'))['total'] or 0
    
    @property
    def total_price(self):
        total = sum(item.subtotal for item in self.items.all())
        return round(total, 2)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['cart', 'product']
    
    def __str__(self):
        return f"{self.product.name} x{self.quantity} in {self.cart.user.username}'s cart"
    
    @property
    def subtotal(self):
        return float(self.product.price) * self.quantity
