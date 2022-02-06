from asyncore import read
from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import Product, Order, OrderItem, ShippingAddress, Review, Variant
from rest_framework.response import Response


class VariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variant        
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    # variants = VariantSerializer(many=True)
    variants = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product        
        fields = '__all__'

    def get_reviews(self, obj):
        qs = obj.reviews.all().order_by('createdAt')[:10]
        serializer = ReviewSerializer(qs, many=True)
        return serializer.data

    def get_variants(self, obj):
        qs = obj.variants.all().order_by('-countInStock')
        serializer = VariantSerializer(qs, many=True)
        return serializer.data