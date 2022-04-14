# Generated by Django 3.2.9 on 2022-04-14 00:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SizeChart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('size', models.IntegerField(blank=True, null=True)),
                ('gap', models.IntegerField(blank=True, null=True)),
                ('length_inch', models.IntegerField(blank=True, null=True)),
                ('length_metric', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='sizechart',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.sizechart'),
        ),
    ]
