from itertools import product
import datetime
from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import Product, Order, OrderItem, ShippingAddress, Review, Variant, Shipment, Payment
from rest_framework.response import Response
from collections import OrderedDict
from django.db.models.fields import PositiveIntegerField
from django.db.models import Sum
from base._serializers import user_serializers
from base._serializers import product_serializers


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    variantInfo = serializers.SerializerMethodField(read_only=True)
    productInfo = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = OrderItem
        fields = '__all__'

    def get_variantInfo(self, obj):
        variant = Variant.objects.get(_id=obj.variantId)
        serializer = product_serializers.VariantSerializer(variant)
        return serializer.data

    def get_productInfo(self, obj):
        product = Product.objects.get(_id=obj.productId)
        serializer = product_serializers.BasicProductInfoSerializer(product)
        return serializer.data

class ShipmentsSerializer(serializers.ModelSerializer):
    createdAt = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Shipment
        fields = '__all__'

    def get_createdAt(self, obj):
        time = obj.createdAt
        return time.strftime("%m-%d-%Y (%H:%M)")

class PaymentsSerializer(serializers.ModelSerializer):
    paidItems = serializers.SerializerMethodField(read_only=True)
    createdAt = serializers.SerializerMethodField(read_only=True)
    shipment = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Payment
        fields = '__all__'

    def get_paidItems(self, obj):
        items = obj.paidItems.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_createdAt(self, obj):
        time = obj.createdAt
        return time.strftime("%m-%d-%Y (%H:%M)")

    def shipment(self, obj):
        serializer = ShipmentsSerializer(obj.shipment, many=False)
        return serializer.data
    
class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    payments = serializers.SerializerMethodField(read_only=True)
    shipments = serializers.SerializerMethodField(read_only=True)
    createdAt = serializers.SerializerMethodField(read_only=True)
    totalPrice = serializers.SerializerMethodField(read_only=True)
    finalPrice = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_totalPrice(self, obj):
        items = obj.orderItems.all()
        totalPrice = 0
        for item in items:
            if item.readyToShip:
                totalPrice += item.subTotal
        return totalPrice

    def get_finalPrice(self,obj):
        items = obj.orderItems.all()
        finalPrice = 0
        for item in items:
            if item.readyToShip:
                finalPrice += item.subTotal
        temp = finalPrice
        finalPrice = round(float(finalPrice)*1.07, 2)
        finalPrice += 10 if temp <= 100 else 0
        return finalPrice

    def get_createdAt(self, obj):
        time = obj.createdAt
        return time.strftime("%m-%d-%Y (%H:%M)")

    def get_payments(self, obj):
        items = obj.payments.all()
        serializer = PaymentsSerializer(items, many=True)
        return serializer.data

    def get_shipments(self, obj):
        items = obj.shipments.all()
        serializer = PaymentsSerializer(items, many=True)
        return serializer.data

    def get_orderItems(self, obj):
        items = obj.orderItems.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(
                obj.shippingAddress, many=False).data
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
        fields = ('productId', 'variantId', 'qty', )

    # def validate(self, data):
    #     variant = Variant.objects.get(_id=int(data['variantId']))
    #     if(variant.countInStock < int(data['qty'])):
    #         # Search for this error code in View to send instructions for reseting cart (fringe case -> drawdown occured while item was in someones cart)
    #         raise serializers.ValidationError(
    #             f'ErrorNoStock -> Product:{variant.product} Variant:{variant.description} is out of stock. Please delete from cart and then try to add it to cart again.EndMessage')
    #     return data


class ShippingAddressCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderCreateSerializer(serializers.ModelSerializer):
    orderItems = OrderItemsCreateSerializer(many=True)
    shippingAddress = ShippingAddressCreateSerializer()

    class Meta:
        model = Order
        fields = ('orderItems', 'shippingAddress', 'instructions')

    def create(self, validated_data):
        user = self.context['request'].user
        temp_orderItems = validated_data.pop('orderItems')
        temp_shippingAddress = validated_data.pop('shippingAddress')

        # Check length of order
        if len(temp_orderItems) == 0:
            raise serializers.ValidationError(
                "Orders must have at least one order item")
        new_order = Order.objects.create(user=user, **validated_data)

        # Create order items
        for temp_orderItem in temp_orderItems:
            new_orderItem = OrderItem.objects.create(
                order=new_order, **temp_orderItem)

        # Calculate pricing
        # new_order.itemsPrice = new_order.orderItems.all().aggregate(Sum('subTotal'))[
        #     'subTotal__sum']
        # new_order.taxPrice = int(new_order.itemsPrice) * 0.06
        # if user.extra.taxExempt:
        #     new_order.taxPrice = 0
        # new_order.shippingPrice = 0 if new_order.itemsPrice > 100 else 10
        # new_order.totalPrice = float(
        #     new_order.itemsPrice) + float(new_order.taxPrice) + float(new_order.shippingPrice)
        new_order.save()

        # Create shipping address
        ShippingAddress.objects.create(
            order=new_order, user=user, **temp_shippingAddress)

        return new_order
