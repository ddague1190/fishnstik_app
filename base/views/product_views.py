from http.client import REQUEST_TIMEOUT
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product, Review, OrderItem, Category
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework import generics
from django.contrib.auth.models import User
from base._serializers import product_serializers
from rest_framework import serializers
from pprint import pprint


class CategoryTreeView(generics.GenericAPIView):
    serializer_class = product_serializers.CategorySerializer

    def get(self, request, *args, **kwargs):

        root_nodes = Category.objects.all().get_cached_trees()

        data = []
        for n in root_nodes:
            data.append(self.recursive_node_to_dict(n))

        return Response(data)

    def recursive_node_to_dict(self, node):
        result = self.get_serializer(instance=node).data
        children = [self.recursive_node_to_dict(
            c) for c in node.get_children()]
        if children:
            result["children"] = children
        return result


@api_view(['GET'])
def getProducts(request, category='', subcategory=''):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    products = Product.objects.filter(name__icontains=query)
    if category:
        category_object = Category.objects.filter(slug=category).first()
        print(category_object)
        products = Product.objects.filter(
            category=category_object)
        if category == 'all':
            products = Product.objects.all().order_by('-createdAt')

    if subcategory:
        category_object = Category.objects.filter(slug=subcategory).first()
        print(category_object)
        products = Product.objects.filter(
            subcategory=category_object)

    page = request.query_params.get('page')
    paginator = Paginator(products, 10)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = product_serializers.BasicProductInfoSerializer(
        products, many=True)
    return Response({
        'products': serializer.data,
        'page': page,
        'pages': paginator.num_pages
    })


@api_view(['GET'])
def getProductsByBrand(request, brand=''):
    products = Product.objects.filter(brand__icontains=brand)
    page = request.query_params.get('page')
    paginator = Paginator(products, 10)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = product_serializers.BasicProductInfoSerializer(
        products, many=True)
    return Response({
        'products': serializer.data,
        'page': page,
        'pages': paginator.num_pages
    })


@api_view(['GET'])
def getProduct(request, slug):
    product = Product.objects.get(slug=slug)
    serializer = product_serializers.ProductSerializer(product, many=False)
    return Response(serializer.data)


class ReviewView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = product_serializers.ReviewSerializer

    def verified_buyer(self, user, product):
        return OrderItem.objects.filter(product=product, order__user=user)

    def already_exists(self, user, product):
        return product.reviews.filter(user=user).exists()

    def create(self, request, pk, *args, **kwargs):
        user = request.user
        product = Product.objects.get(_id=pk)

        if not self.verified_buyer(user, product):
            raise serializers.ValidationError(
                {'detail': "You must be a verfied buyer to leave a review."})
        if self.already_exists(user, product):
            raise serializers.ValidationError(
                {"detail": "Product already reviewed."})

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()

        if serializer.errors:
            if serializer.errors['comment'][0]:
                raise serializers.ValidationError(
                    {'detail': serializer.errors['comment'][0].title()})
        if serializer.validated_data['rating'] == 0:
            raise serializers.ValidationError(
                {'detail': "Review cannot be 0."})
        serializer.save(user=request.user, product=Product.objects.get(_id=pk))

        return Response(status=status.HTTP_201_CREATED)
