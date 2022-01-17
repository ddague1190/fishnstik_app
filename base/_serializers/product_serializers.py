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
    variants = VariantSerializer(many=True)

    class Meta:
        model = Product        
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.reviews.all().order_by('createdAt')[:10]
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data