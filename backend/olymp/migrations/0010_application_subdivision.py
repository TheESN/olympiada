# Generated by Django 5.0.2 on 2024-10-31 03:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('olymp', '0009_rename_application_date_application_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='subdivision',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='app_subdivisions', to='olymp.subdivision', verbose_name='Местоположение'),
        ),
    ]
