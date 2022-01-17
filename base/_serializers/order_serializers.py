from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import Product, Order, OrderItem, ShippingAddress, Review, Variant
from rest_framework.response import Response
from collections import OrderedDict
from django.db.models.fields import PositiveIntegerField
from django.db.models import Sum
from base._serializers import user_serializers


class ShippingAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShippingAddress        
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem        
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order        
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderItems.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):

        try:
            address = ShippingAddressSerializer(obj.shippingAddress, many=False).data
        except: 
            address = False
        return address

    def get_user(self, obj): 
        user = obj.user
        serializer = user_serializers.UserSerializer(user, many=False)
        return serializer.data
        
class OrderItemsCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = ('productId', 'variantId', 'qty')

    def validate(self, data):
        variant = Variant.objects.get(_id=int(data['variantId']))
        if(variant.countInStock < int(data['qty'])):
        # Search for this error code in View to send instructions for reseting cart (fringe case -> drawdown occured while item was in someones cart)
            raise serializers.ValidationError(f'ErrorNoStock -> Product:{variant.product} Variant:{variant.description} is out of stock. Please delete from cart and then try to add it to cart again.EndMessage')
        return data
    
class ShippingAddressCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'

class OrderCreateSerializer(serializers.ModelSerializer):
    orderItems = OrderItemsCreateSerializer(many=True)
    shippingAddress = ShippingAddressCreateSerializer()

    class Meta:
        model = Order
        fields = ('orderItems', 'paymentMethod', 'shippingAddress', 'instructions')

    def create(self, validated_data):
        user = self.context['request'].user
        temp_orderItems = validated_data.pop('orderItems')
        temp_shippingAddress = validated_data.pop('shippingAddress')
 
        # Check length of order
        if len(temp_orderItems) == 0:
            raise serializers.ValidationError("Orders must have at least one order item")
        new_order = Order.objects.create(user=user, **validated_data)

        # Create order items
        for temp_orderItem in temp_orderItems: 
            new_orderItem = OrderItem.objects.create(order=new_order, **temp_orderItem)

        # Calculate pricing
        new_order.itemsPrice = new_order.orderItems.all().aggregate(Sum('subTotal'))['subTotal__sum']
        new_order.taxPrice = int(new_order.itemsPrice) * 0.06
        if user.extra.taxExempt:
            new_order.taxPrice = 0
        new_order.shippingPrice = 0 if new_order.itemsPrice > 100 else 10
        new_order.totalPrice = float(new_order.itemsPrice) + float(new_order.taxPrice) + float(new_order.shippingPrice)
        new_order.save()
        
        # Create shipping address
        ShippingAddress.objects.create(order=new_order, user=user, **temp_shippingAddress)


        return new_order            
        
 