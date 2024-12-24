from .models import *

def add_to_cart(user, product, quantity):
    cart, created = Cart.objects.get_or_create(user=user)
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    cart_item.quantity += quantity
    cart_item.price = product.price
    cart_item.save()



def create_order(user):
    cart = Cart.objects.get(user=user)
    order = Order.objects.create(user=user, status='pending')
    for cart_item in cart.cartitem_set.all():
        OrderItem.objects.create(
            order=order,
            product=cart_item.product,
            quantity=cart_item.quantity,
            price=cart_item.price  
        )
    cart.cartitem_set.all().delete() 
    return order
