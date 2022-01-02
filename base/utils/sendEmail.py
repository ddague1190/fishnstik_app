from dotenv import dotenv_values
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import secrets

def sendOTP(email):
    config = dotenv_values(".env")
    OTP = str(secrets.randbits(17))
    message = Mail(
        from_email='support@shopstonethrone.com',
        to_emails=email,
        subject='Your OTP for email verification',
        html_content='<h3>From FishNStik registration form: Your OTP is ' + OTP + '</h3> <h4> Please copy this over to the registration form for FishNStik</h4>')
    try:
        sg = SendGridAPIClient(config['SENDGRID_API_KEY'])
        response = sg.send(message)

    except Exception as e:
        print(e.message)
        return e.message
    return OTP

