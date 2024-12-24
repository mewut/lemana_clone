# views.py
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.db import transaction
from .models import *
from .services import add_to_cart
from django.contrib.auth.decorators import login_required


def product_list(request):
    products = Product.objects.all()
    categories = Category.objects.all()
    context = {
        'products': products,
        'categories': categories,
    }
    return render(request, 'shop/product_list.html', context)


def product_detail(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    related_products = RelatedProduct.objects.filter(product=product)
    frequently_bought_together = FrequentlyBoughtTogether.objects.filter(product=product)
    context = {
        'product': product,
        'related_products': related_products,
        'frequently_bought_together': frequently_bought_together,
    }
    return render(request, 'shop/product_detail.html', context)


@login_required
def add_to_cart_view(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    quantity = int(request.POST.get('quantity', 1))
    add_to_cart(request.user, product, quantity)
    return JsonResponse({'status': 'success'})


def cart_detail(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    cart_items = CartItem.objects.filter(cart=cart)
    context = {
        'cart': cart,
        'cart_items': cart_items,
    }
    return render(request, 'shop/cart_detail.html', context)


def create_order(request):
    cart = get_object_or_404(Cart, user=request.user)
    with transaction.atomic():
        order = Order.objects.create(user=request.user, status='pending')
        cart_items = CartItem.objects.filter(cart=cart)
        for cart_item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                price=cart_item.product.price
            )
            cart_item.product.stock -= cart_item.quantity
            cart_item.product.save()
        cart_items.delete()
        cart.delete()
    return JsonResponse({'status': 'success', 'order_id': order.id})


def order_list(request):
    orders = Order.objects.filter(user=request.user)
    context = {
        'orders': orders,
    }
    return render(request, 'shop/order_list.html', context)
