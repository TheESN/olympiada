from django.contrib import admin
from .models import Olympiada, Person, Employee, Student, Application, Subdivision

# Register your models here.
admin.site.register(Olympiada)
admin.site.register(Person)
admin.site.register(Employee)
admin.site.register(Student)
admin.site.register(Application)
admin.site.register(Subdivision)