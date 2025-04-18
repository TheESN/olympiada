# Generated by Django 5.0.2 on 2025-03-01 07:50

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('olymp', '0013_remove_person_sex_student_sex'),
    ]

    operations = [
        migrations.CreateModel(
            name='Participant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('application', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='participant_applications', to='olymp.application', verbose_name='Заявка')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='participant_students', to='olymp.student', verbose_name='Учащийся')),
            ],
        ),
        migrations.CreateModel(
            name='Result',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('task_number', models.CharField(max_length=1, verbose_name='Номер задачи')),
                ('result_value', models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)], verbose_name='Балл')),
                ('participant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='result_students', to='olymp.participant', verbose_name='Участник')),
            ],
        ),
    ]
