# Generated by Django 3.2.9 on 2022-04-25 14:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='parentId',
            new_name='parent',
        ),
        migrations.RenameField(
            model_name='comment',
            old_name='user',
            new_name='userId',
        ),
    ]