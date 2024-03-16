from django.db import models


# Create your models here.
class Olympiada(models.Model):
    olymp_name = models.CharField("Наименование", max_length=200, db_index=True)
    olymp_date_start = models.DateField("Дата проведения")
    olymp_time = models.TimeField("Длительность")
    #olymp_creator = models.CharField(max_length=200)
