from django.db import models
from users.models import User
from products.models import Product, PromoCode
from decimal import Decimal


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    order_number = models.CharField(max_length=50, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    promo_code = models.ForeignKey(PromoCode, on_delete=models.SET_NULL, blank=True, null=True)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    total = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    purchase_date = models.DateTimeField(auto_now_add=True)
    shipping_address = models.TextField()
    notes = models.TextField(blank=True, null=True)
    
    class Meta:
        ordering = ['-purchase_date']
    
    def __str__(self):
        return f"Order {self.order_number} - {self.user.username} - ${self.total}"
    
    def save(self, *args, **kwargs):
        if not self.order_number:
            import uuid
            self.order_number = f"ORD-{uuid.uuid4().hex[:12].upper()}"
        super().save(*args, **kwargs)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price at time of purchase
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f"{self.product.name} x{self.quantity} in Order {self.order.order_number}"
    
    def save(self, *args, **kwargs):
        self.subtotal = Decimal(str(self.price)) * self.quantity
        super().save(*args, **kwargs)
