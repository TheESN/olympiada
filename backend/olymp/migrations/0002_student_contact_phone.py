# Generated by Django 5.0.2 on 2024-03-16 04:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('olymp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='contact_phone',
            field=models.CharField(default='', max_length=20, verbose_name='Контактный номер телефона'),
            preserve_default=False,
        ),
    ]
