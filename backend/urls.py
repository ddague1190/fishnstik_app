
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from payments.views import ProcessWebhookView
from django.views.generic import TemplateView

urlpatterns = [

    path('fns192837465/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
    path('api/products', include('base.urls.product_urls')),
    path('api/users/', include('base.urls.user_urls')),
    path('api/orders/', include('base.urls.order_urls')),
    path('webhooks/paypal/', ProcessWebhookView.as_view())

] 


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += [
    # match the root
    path(r'^$', TemplateView.as_view(template_name='index.html')),
    # match all other pages
    path(r'^(?:.*)/?$', TemplateView.as_view(template_name='index.html')),
]
