from django.contrib import admin
from .models import *
from django.db import models
from django.utils.html import format_html
from django.contrib.admin.widgets import AdminFileWidget
from django.utils.safestring import mark_safe
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as AuthUserAdmin
# from rest_framework_simplejwt.token_blacklist import models as blacklist_models
# from rest_framework_simplejwt.token_blacklist.admin import OutstandingTokenAdmin



class AdminImageWidget(AdminFileWidget):
    def render(self, name, value, attrs=None, renderer=None):
        output = []
        if value and getattr(value, "url", None):
            image_url = value.url
            file_name = str(value)
            output.append(u' <a href="%s" target="_blank"><img src="%s" alt="%s" width="100" height="100"  style="object-fit: cover;"/></a>' %
                          (image_url, image_url, file_name))
        output.append(super(AdminFileWidget, self).render(name, value, attrs))
        return mark_safe(u''.join(output))

class VariantsInline(admin.TabularInline):
    model = Variant
    fk_name = 'product'
    extra = 1
    formfield_overrides = {models.ImageField: {'widget': AdminImageWidget}}

class PicturesInline(admin.TabularInline):
    model = Pictures
    fk_name = 'product'
    extra = 1
    formfield_overrides = {models.ImageField: {'widget': AdminImageWidget}}

class ProductAdmin(admin.ModelAdmin):
    inlines = [
        VariantsInline,
        PicturesInline
    ]

class ShippingAddressInline(admin.TabularInline):
    model = ShippingAddress
    fk_name = 'order'
    extra = 0

class OrderItemsInline(admin.TabularInline):
    model = OrderItem
    fk_name = 'order'
    extra = 0
    formfield_overrides = {models.ImageField: {'widget': AdminImageWidget}}

class OrderAdmin(admin.ModelAdmin):
    inlines = [
        OrderItemsInline,
        ShippingAddressInline
    ]


admin.site.register(Product, ProductAdmin)
admin.site.register(Review)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem)
admin.site.register(Pictures)
admin.site.register(Variant)
admin.site.register(ShippingAddress)

class ExtraUserInfo(admin.StackedInline):
    model = ExtraUserInfo
    max_num = 1
    can_delete = False

class UserAdmin(AuthUserAdmin):
    inlines = [ExtraUserInfo]

# unregister old user admin
admin.site.unregister(User)
# register new user admin
admin.site.register(User, UserAdmin)

# class NewOutstandingTokenAdmin(OutstandingTokenAdmin):

#     def has_delete_permission(self, *args, **kwargs):
#         return True


# admin.site.unregister(blacklist_models.OutstandingToken)
# admin.site.register(blacklist_models.OutstandingToken, NewOutstandingTokenAdmin)
