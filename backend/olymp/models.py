from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User


# Create your models here.
class Olympiada(models.Model):
    olymp_name = models.CharField("Наименование", max_length=200, db_index=True)
    olymp_date_start = models.DateField("Дата проведения")
    olymp_time = models.TimeField("Длительность")
    #olymp_creator = models.CharField(max_length=200)

    
organizer = 0
representative = 1

ROLES =  ((organizer, "Организатор"),
         (representative, "Представитель муниципалитета"))


male = 0
female = 1

sex = ((male, "Мужской"),(female, "Женский"))

class Person(models.Model):
    name = models.CharField(max_length=200)
    sex = models.IntegerField("Пол", choices=sex)
    #city = models.CharField(max_length=200)
    #munic_entity = models.CharField(max_length=200)
    def __str__(self):
        return self.name


class Employee(Person):
    role = models.IntegerField(default=0, choices=ROLES)
    user = models.ForeignKey(User, verbose_name="Пользователь", on_delete=models.CASCADE)


class Student(Person):
    birthday = models.DateField("Дата рождения")
    course_study = models.IntegerField("Класс обучения", validators=[MinValueValidator(1), MaxValueValidator(12)])
    course_participate = models.IntegerField("Класс участия", validators=[MinValueValidator(1), MaxValueValidator(12)])
    special_needs = models.BooleanField("Ограниченные возможности здоровья", default=False)
    teacher = models.ForeignKey(Person, verbose_name="Учитель", null=True, on_delete=models.SET_NULL, related_name='teachers')
    contact_phone = models.CharField("Контактный номер телефона", max_length=20)