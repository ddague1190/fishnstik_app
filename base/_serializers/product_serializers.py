from asyncore import read
from json.encoder import INFINITY
from rest_framework import serializers
from django.contrib.auth.models import User
from base.models import Product, Order, OrderItem, ShippingAddress, Review, Variant, Pictures, Category, ProductDetailsList
from rest_framework.response import Response


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            "name",
            "slug",
            "description",
            "image",
            "type"
        )


class VariantSerializer(serializers.ModelSerializer):
    pack = serializers.SerializerMethodField(read_only=True)
    material = serializers.SerializerMethodField(read_only=True)
    _type = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Variant
        fields = '__all__'

    def get_pack(self, obj):
        try:
            val = obj.pack.name
        except:
            val = None
        return val

    def get_material(self, obj):
        try:
            val = obj.material.name
        except:
            val = None
        return val

    def get__type(self, obj):
        try:
            val = obj._type.name
        except:
            val = None
        return val


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

    def validate_comment(self, value):
        if len(value) > 100:
            raise serializers.ValidationError(
                "Comment must have fewer than 199 characters")
        return value

    def validate(self, value):
        if len(value)>100:
            raise serializers.ValidationError({'detail': "Comment must be less than 100 characters."})
        return value


class PicturesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pictures
        fields = '__all__'


class ProductDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetailsList
        fields = ('detail',)


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    # variants = VariantSerializer(many=True)
    variants = serializers.SerializerMethodField(read_only=True)
    images = serializers.SerializerMethodField(read_only=True)
    category = serializers.SerializerMethodField(read_only=True)
    subcategory = serializers.SerializerMethodField(read_only=True)
    details = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_subcategory(self, obj):
        return {'name': obj.subcategory.name, 'slug': obj.subcategory.slug}

    def get_category(self, obj):
        return {'name': obj.category.name, 'slug': obj.category.slug}

    def get_reviews(self, obj):
        qs = obj.reviews.all().order_by('createdAt')[:10]
        serializer = ReviewSerializer(qs, many=True)
        return serializer.data

    def get_variants(self, obj):
        qs = obj.variants.all()
        serializer = VariantSerializer(qs, many=True)
        return serializer.data

    def get_details(self, obj):
        qs = obj.details.all()
        serializer = ProductDetailsSerializer(qs, many=True)
        return serializer.data

    def get_images(self, obj):
        qs = obj.images.all()
        serializer = PicturesSerializer(qs, many=True)
        return serializer.data


class BasicProductInfoSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(read_only=True)
    variantFacts = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = ('name', 'slug', 'image', 'variantFacts')

    def get_variantFacts(self,obj):
        numVariants = obj.variants.all().count()
        bottomPrice = INFINITY
        for item in obj.variants.all():
            bottomPrice = min(item.price, bottomPrice)
        return {'numVariants': numVariants, 'bottomPrice': bottomPrice}

    
    

    def get_image(self, obj):
        qs = obj.images.first()
        serializer = PicturesSerializer(qs)
        return serializer.data
