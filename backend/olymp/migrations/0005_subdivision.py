# Generated by Django 5.0.2 on 2024-05-07 12:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('olymp', '0004_application_application_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subdivision',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subdivision_name', models.CharField(db_index=True, max_length=200, verbose_name='Наименование района')),
            ],
        ),
    ]
