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
teacher = 2

ROLES =  ((organizer, "Организатор"),
         (representative, "Представитель муниципалитета"),
         (teacher, "Учитель"))

male = 0
female = 1

sex = ((male, "Мужской"),(female, "Женский"))


pending = 0
accepted = 1
rejected = 2

APPLICATION_STATUS = ((pending, "В ожидании"), (accepted, "Принята"), (rejected, "Отклонена"))

class Person(models.Model):
    name = models.CharField(max_length=200)
    #sex = models.CharField(max_length=200)
    #city = models.CharField(max_length=200)
    #munic_entity = models.CharField(max_length=200)
    def __str__(self):
        return self.name


class Employee(Person):
    role = models.IntegerField(default=0, choices=ROLES)
    user = models.ForeignKey(User, verbose_name="Пользователь", null=True, on_delete=models.CASCADE)

class Country(models.Model):
    country_name = models.CharField("Название страны", max_length=200)

    def __str__(self):
        return self.country_name

class Student(Person):
    birthday = models.DateField("Дата рождения")
    course_study = models.IntegerField("Класс обучения", validators=[MinValueValidator(1), MaxValueValidator(12)])
    special_needs = models.BooleanField("Ограниченные возможности здоровья", default=False)
    contact_phone = models.CharField("Контактный номер телефона", max_length=20)
    country = models.ForeignKey(Country, verbose_name="Страна", null=True, on_delete=models.SET_NULL, related_name='countries')
    sex = models.IntegerField("Пол", choices=sex)

class Application(models.Model):
    student = models.ForeignKey(Student, verbose_name="Учащийся", on_delete=models.CASCADE, related_name='students')
    olymp = models.ForeignKey(Olympiada, verbose_name="Олимпиада", on_delete=models.CASCADE, related_name='olympiadas')
    date = models.DateTimeField("Дата регистрации", auto_now_add=True)
    employee = models.ForeignKey(Employee, verbose_name="Ответственный", null=True, on_delete=models.SET_NULL, related_name='employees')
    status = models.IntegerField(default=0, verbose_name="Статус заявки", choices=APPLICATION_STATUS)
    participate = models.IntegerField("Класс участия", validators=[MinValueValidator(1), MaxValueValidator(12)])
    school = models.ForeignKey("School", verbose_name="Общеобразовательная организация", null=True, on_delete=models.SET_NULL, related_name='schools')
    teacher = models.ForeignKey(Employee, verbose_name="Учитель", null=True, on_delete=models.SET_NULL, related_name='teachers')
    subdivision = models.ForeignKey("Subdivision", verbose_name="Местоположение", null=True, on_delete=models.SET_NULL, related_name='app_subdivisions')

class Subdivision(models.Model):
    subdivision_name = models.CharField("Наименование района", max_length=200, db_index=True)

    def __str__(self):
        return self.subdivision_name

class School(models.Model):
    school_name = models.CharField("Название образовательной организации", max_length=200)
    school_subdivision = models.ForeignKey(Subdivision, verbose_name="Местоположение", null=True, on_delete=models.SET_NULL, related_name='subdivisions')

    def __str__(self):
        return self.school_name

class Participant(models.Model):
    student = models.ForeignKey("Student", verbose_name="Учащийся", on_delete=models.CASCADE, related_name='participant_students')
    application = models.ForeignKey("Application", verbose_name="Заявка", on_delete=models.CASCADE, related_name='participant_applications')

class Result(models.Model):
    participant = models.ForeignKey("Participant", verbose_name="Участник", on_delete=models.CASCADE, related_name='result_students')
    task_number = models.CharField("Номер задачи", max_length=1)
    result_value = models.IntegerField(verbose_name="Балл", validators=[MinValueValidator(0), MaxValueValidator(100)])