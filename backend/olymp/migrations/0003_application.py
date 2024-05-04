# Generated by Django 5.0.2 on 2024-05-04 03:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('olymp', '0002_student_contact_phone'),
    ]

    operations = [
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('application_date', models.DateTimeField(verbose_name='Дата регистрации')),
                ('application_employee', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='employees', to='olymp.employee', verbose_name='Ответственный')),
                ('applied_olymp', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='olympiadas', to='olymp.olympiada', verbose_name='Олимпиада')),
                ('applied_student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='students', to='olymp.student', verbose_name='Учащийся')),
            ],
        ),
    ]
