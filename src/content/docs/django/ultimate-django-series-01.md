---
title: Ultimate Django Series Part 1
description: Learn how to master building and interacting with databases within a Django project.
---

## Start App

```
mkdir storefront
cd storefront
pipenv install
pipenv install django
django-admin startproject storefront .
python manage.py startapp store
python manage.py startapp tags
```

```py
# storefront/settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'store',
    'tags',
]
```

## Building a Data Model

```py
# store/models.py
from django.db import models


class Promotion(models.Model):
    description = models.CharField(max_length=255)
    discount = models.FloatField()


class Collection(models.Model):
    title = models.CharField(max_length=255)
    featured_product = models.ForeignKey(
        'Product', on_delete=models.SET_NULL, null=True, related_name='+')


class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    inventory = models.IntegerField()
    last_update = models.DateTimeField(auto_now=True)
    collection = models.ForeignKey(Collection, on_delete=models.PROTECT)
    promotions = models.ManyToManyField(Promotion)


class Customer(models.Model):
    MEMBERSHIP_BRONZE = 'B'
    MEMBERSHIP_SILVER = 'S'
    MEMBERSHIP_GOLD = 'G'

    MEMBERSHIP_CHOICES = [
        (MEMBERSHIP_BRONZE, 'Bronze'),
        (MEMBERSHIP_SILVER, 'Silver'),
        (MEMBERSHIP_GOLD, 'Gold'),
    ]
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=255)
    birth_date = models.DateField(null=True)
    membership = models.CharField(
        max_length=1, choices=MEMBERSHIP_CHOICES, default=MEMBERSHIP_BRONZE)


class Order(models.Model):
    PAYMENT_STATUS_PENDING = 'P'
    PAYMENT_STATUS_COMPLETE = 'C'
    PAYMENT_STATUS_FAILED = 'F'
    PAYMENT_STATUS_CHOICES = [
        (PAYMENT_STATUS_PENDING, 'Pending'),
        (PAYMENT_STATUS_COMPLETE, 'Complete'),
        (PAYMENT_STATUS_FAILED, 'Failed')
    ]

    placed_at = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(
        max_length=1, choices=PAYMENT_STATUS_CHOICES, default=PAYMENT_STATUS_PENDING)
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.PROTECT)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveSmallIntegerField()
    unit_price = models.DecimalField(max_digits=6, decimal_places=2)


class Address(models.Model):
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE)


class Cart(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField()

```

```py
# tags/models.py
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models


class Tag(models.Model):
    label = models.CharField(max_length=255)


class TaggedItem(models.Model):
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()

```

## Settings Up the Database

```
python manage.py startapp likes
```

```py
# storefront/settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'store',
    'tags',
    'likes', # add likes
]
```

```python
# likes/models.py
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models


class LikedItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()


```

[mockaroo.com](https://mockaroo.com/) - dummy data (vpn)

## Django ORM

```py
# playground/views.py
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render

from store.models import Product


def say_hello(request):
    try:
        product = Product.objects.get(pk=0)
    except ObjectDoesNotExist:
        pass
    return render(request, 'hello.html', {'name': 'Mosh'})

```

или

```py
def say_hello(request):
    # NULL
    product = Product.objects.filter(pk=0).first()
    return render(request, 'hello.html', {'name': 'Mosh'})

```

или

```py
def say_hello(request):
    # BOOLEAN
    exists = Product.objects.filter(pk=0).exists()
    return render(request, 'hello.html', {'name': 'Mosh'})

```

```py
queryset = Product.objects.filter(unit_price__gt=20)
```

```py
queryset = Product.objects.filter(unit_price__range=(20,30))
```

### Q Objects

```py
# playground/views.py
from django.shortcuts import render
from django.db.models import Q

from store.models import Product


def say_hello(request):
    queryset = Product.objects.filter(Q(inventory__lt=10) & ~Q(unit_price__lt=20))
    return render(request, 'hello.html', {'name': 'Mosh'})

```

### F Objects

```py
# playground/views.py
from django.shortcuts import render
from django.db.models import Q, F

from store.models import Product


def say_hello(request):
    queryset = Product.objects.filter(inventory=F('unit_price'))
    return render(request, 'hello.html', {'name': 'Mosh'})

```

![RequestResponse Cycle](@assets/images/django/django-orm-01.png)