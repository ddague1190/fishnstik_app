# Generated by Django 3.2.9 on 2022-03-04 23:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0017_auto_20220304_2243'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='display_as_pulldown',
            field=models.BooleanField(default=False),
        ),
    ]
