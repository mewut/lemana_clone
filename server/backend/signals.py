from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Product, CartItem


@receiver(post_save, sender=Product)
def update_cart_item_price(sender, instance, **kwargs):
    CartItem.objects.filter(product=instance).update(price=instance.price)
