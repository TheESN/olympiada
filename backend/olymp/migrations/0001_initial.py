# Generated by Django 5.0.2 on 2024-03-16 03:45

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Olympiada',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('olymp_name', models.CharField(db_index=True, max_length=200, verbose_name='Наименование')),
                ('olymp_date_start', models.DateField(verbose_name='Дата проведения')),
                ('olymp_time', models.TimeField(verbose_name='Длительность')),
            ],
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('sex', models.IntegerField(choices=[(0, 'Мужской'), (1, 'Женский')], verbose_name='Пол')),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('person_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='olymp.person')),
                ('role', models.IntegerField(choices=[(0, 'Организатор'), (1, 'Представитель муниципалитета')], default=0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
            bases=('olymp.person',),
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('person_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='olymp.person')),
                ('birthday', models.DateField(verbose_name='Дата рождения')),
                ('course_study', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(12)], verbose_name='Класс обучения')),
                ('course_participate', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(12)], verbose_name='Класс участия')),
                ('special_needs', models.BooleanField(default=False, verbose_name='Ограниченные возможности здоровья')),
                ('teacher', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='teachers', to='olymp.person', verbose_name='Учитель')),
            ],
            bases=('olymp.person',),
        ),
    ]
