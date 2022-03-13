from asyncore import read
from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import Product, Order, OrderItem, ShippingAddress, Review, Variant, Pictures
from rest_framework.response import Response


class VariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variant        
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

    def validate_comment(self, value):
        print('herefromvalidatecomment')
        if len(value) >100:
            raise serializers.ValidationError("Comment must have fewer than 199 characters")
        return value

    # def validate(self, value):
    #     if len(value)>100:
    #         raise serializers.ValidationError({'detail': "Comment must be less than 100 characters."})
    #     return value

class PicturesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pictures        
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    # variants = VariantSerializer(many=True)
    variants = serializers.SerializerMethodField(read_only=True)
    images = serializers.SerializerMethodField(read_only=True)

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

    def get_images(self, obj):
        qs = obj.images.all()
        serializer = PicturesSerializer(qs, many=True)
        return serializer.data

class BasicProductInfoSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product        
        fields = ('name', 'image', '_id', 'pulltest')

    def get_image(self, obj):
        qs = obj.images.first()
        serializer = PicturesSerializer(qs)
        return serializer.data