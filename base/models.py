from django.db import models
from django.contrib.auth.models import User
from django.db.models import Avg
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from base.utils.sendOrderEmail import sendOrderEmail
from dotenv import load_dotenv
import os
if not os.environ.get("PRODUCTION"):
    load_dotenv()

DISCOUNT_TIERS = (
    ('regular', 'Regular'),
    ('preferred', 'Preferred'),
    ('platinum', 'Platinum')
)
class ExtraUserInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='extra')
    discountTier = models.CharField(max_length=10, choices=DISCOUNT_TIERS, default='regular')
    isAuthenticated = models.BooleanField(default = False)
    OTP = models.IntegerField(null=True, blank=True)
    OTP_createdAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        ExtraUserInfo.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.extra.save()

class Product(models.Model):
    catchPhrase = models.CharField(max_length=200, null=True, blank=True)
    numVariants = models.IntegerField(null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.numVariants = self.variants.all().count()    
        super(Product, self).save(*args, **kwargs)


class Variant(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    image = models.ImageField(null=True, blank=True)
    identifier = models.CharField(max_length=200, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    description = models.CharField(max_length=200, null=True, blank=True)
    snap = models.BooleanField(default=False)
    relatedProductLink = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    discountPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)

    def __str__(self):
        return str(self.description)

    def save(self, *args, **kwargs):
        super(Variant, self).save(*args, **kwargs)
        product = Product.objects.get(pk=self.product.pk)
        product.numVariants = product.variants.all().count()   
        product.save()     

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(max_length=100, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)
    
    def save(self, *args, **kwargs):
        super(Review, self).save(*args, **kwargs)
        product = Product.objects.get(pk = self.product.pk)
        product.rating = product.reviews.all().aggregate(Avg('rating'))['rating__avg']
        product.numReviews = product.reviews.count()
        product.save()

class OrderManager(models.Manager):
    def create(self, **obj_data):        
        return super(OrderManager, self).create(**obj_data)

class Order(models.Model):

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    itemsPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    taxPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True, default=0)
    totalPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    amountPaid = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    paymentID = models.CharField(max_length=200, null=True, blank=True)
    shippingService=models.CharField(max_length=200, null=True, blank=True, default='UPS')
    trackingNumber=models.CharField(max_length=200, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paymentVerified = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)
    instructions = models.TextField(max_length=200, null=True, blank=True)
    addressPayPal=models.TextField(max_length=200, null=True, blank=True)

    objects = OrderManager()

    def __str__(self):
        return str(self._id)
    
    def save(self, *args, **kwargs): 
        super(Order, self).save(*args, **kwargs)
        if self.paymentVerified:
            sendOrderEmail(self.user.email, os.getenv('MAIN_EMAIL'), self._id)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True, null=True)
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE, blank=True, null=True)
    productId = models.IntegerField(null=True, blank=True)
    variantId = models.IntegerField(null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True, related_name='orderItems')
    name = models.CharField(max_length=200, null=True, blank=True)
    variantDescription = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2)
    subTotal = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)

    def save(self, *args, **kwargs):

        #1. Import poduct attributes
        self.product = Product.objects.get(_id=self.productId)
        self.name = self.product.name

        #2. Import variant attributes

        self.variant = Variant.objects.get(_id=self.variantId)
        self.image = self.variant.image
        self.variantDescription = self.variant.description
        self.price = self.variant.price
        self.subTotal = int(self.price) * int(self.qty)
        
        #3. Drawdown

        self.variant.countInStock -= self.qty
        self.variant.save()  
        super(OrderItem, self).save(*args, **kwargs)


@receiver(pre_delete, sender=OrderItem, dispatch_uid='return_to_stock')
def returnToStock(sender, instance, **kwargs):
    instance.variant.countInStock += instance.qty
    instance.variant.save()


class ShippingAddress(models.Model):
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True, related_name='shippingAddress')
    name= models.CharField(max_length=200, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    apartment = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    state = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False),
    phone = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return str(self.address)