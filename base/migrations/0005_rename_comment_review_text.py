# Generated by Django 3.2.9 on 2022-04-20 17:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_auto_20220420_1722'),
    ]

    operations = [
        migrations.RenameField(
            model_name='review',
            old_name='comment',
            new_name='text',
        ),
    ]
