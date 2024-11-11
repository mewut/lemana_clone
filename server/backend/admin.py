from django.contrib import admin
from .models import *

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ProductImage)
admin.site.register(RelatedProduct)
admin.site.register(FrequentlyBoughtTogether)