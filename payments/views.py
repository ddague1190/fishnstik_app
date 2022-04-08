import json
from django.conf import settings
from django.http import HttpResponse, HttpResponseBadRequest
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from pprint import pprint
from paypalrestsdk import notifications
from base.models import Product, Order, OrderItem, ShippingAddress, Variant



@method_decorator(csrf_exempt, name="dispatch")
class ProcessWebhookView(View):
    def post(self, request):
        if "HTTP_PAYPAL_TRANSMISSION_ID" not in request.META:
            return HttpResponseBadRequest()

        auth_algo = request.META['HTTP_PAYPAL_AUTH_ALGO']
        cert_url = request.META['HTTP_PAYPAL_CERT_URL']
        transmission_id = request.META['HTTP_PAYPAL_TRANSMISSION_ID']
        transmission_sig = request.META['HTTP_PAYPAL_TRANSMISSION_SIG']
        transmission_time = request.META['HTTP_PAYPAL_TRANSMISSION_TIME']
        webhook_id = settings.PAYPAL_WEBHOOK_ID
        event_body = request.body.decode(request.encoding or "utf-8")

        valid = notifications.WebhookEvent.verify(
            transmission_id=transmission_id,
            timestamp=transmission_time,
            webhook_id=webhook_id,
            event_body=event_body,
            cert_url=cert_url,
            actual_sig=transmission_sig,
            auth_algo=auth_algo,
        )

        if not valid:
            print('webhook not valid 🏵')
            return HttpResponseBadRequest()

        webhook_event = json.loads(event_body)
        pprint(webhook_event)
        amountPaid = float(webhook_event["resource"]["purchase_units"][0]["amount"]['value'])
        order_number = webhook_event["resource"]["purchase_units"][0]["custom_id"]
        payPal_id = webhook_event["resource"]["id"]
        order = Order.objects.get(pk=order_number)
        order.paymentVerified=True
        order.amountPaid=amountPaid
        order.paymentID = payPal_id
        order.addressPayPal = json.dumps(webhook_event["resource"]["purchase_units"][0]["shipping"])
        order.save()
        return HttpResponse()
        