from django.contrib import admin
from .models import Olympiada, Person, Employee, Student, Application, Subdivision, School, Country, Participant, Result

# Register your models here.
admin.site.register(Olympiada)
admin.site.register(Person)
admin.site.register(Employee)
admin.site.register(Student)
admin.site.register(Application)
admin.site.register(Subdivision)
admin.site.register(School)
admin.site.register(Country)
admin.site.register(Participant)
admin.site.register(Result)
