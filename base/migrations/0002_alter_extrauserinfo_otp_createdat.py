# Generated by Django 4.0 on 2021-12-22 11:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='extrauserinfo',
            name='OTP_createdAt',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
