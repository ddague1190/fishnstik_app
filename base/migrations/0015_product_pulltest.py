# Generated by Django 3.2.9 on 2022-02-03 00:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0014_product_subcategory'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='pulltest',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]