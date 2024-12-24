from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import *


@receiver(post_save, sender=Product)
def update_cart_item_price(sender, instance, **kwargs):
    CartItem.objects.filter(product=instance).update(price=instance.price)


@receiver(post_save, sender=User)
def create_user_cart(sender, instance, created, **kwargs):
    if created:
        Cart.objects.create(user=instance)
