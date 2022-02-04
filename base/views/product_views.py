from http.client import REQUEST_TIMEOUT
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product, Review, OrderItem
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework import generics
from django.contrib.auth.models import User
from base._serializers import product_serializers
from rest_framework import serializers
from pprint import pprint

@api_view(['GET'])
def getProducts(request, category='', subcategory=''):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    products = Product.objects.filter(name__icontains=query)
    
    if category:
        products = Product.objects.filter(category=category)
        if category =='all':
            products = Product.objects.all()

    if subcategory:
        products = Product.objects.filter(subcategory=subcategory)

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

    serializer = product_serializers.ProductSerializer(products, many=True)
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

   
    serializer = product_serializers.ProductSerializer(products, many=True)
    return Response({
        'products': serializer.data,
        'page': page,
        'pages': paginator.num_pages
    })

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = product_serializers.ProductSerializer(product, many=False)
    return Response(serializer.data)


class ReviewView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = product_serializers.ReviewSerializer

    def verified_buyer(self, user, product):
        return OrderItem.objects.filter(product=product, order__user=user);        

    def already_exists(self, user, product):
        return product.reviews.filter(user=user).exists()
        
    def create(self, request, pk, *args, **kwargs):
        user = request.user
        product = Product.objects.get(_id=pk)
        if not self.verified_buyer(user, product):
            raise serializers.ValidationError({'detail': "You must be a verfied buyer to leave a review."})
        if self.already_exists(user, product):
            raise serializers.ValidationError({"detail": "Product already reviewed."})
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        if serializer.validated_data['rating'] == 0:
            raise serializers.ValidationError({'detail': "Review cannot be 0."})

        serializer.save(user=request.user, product=Product.objects.get(_id=pk) )  

        return Response(status=status.HTTP_201_CREATED)

