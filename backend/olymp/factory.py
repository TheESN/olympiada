from django.db.models.expressions import result

from .models import Subdivision, School

class Factory():
    @classmethod
    def create_school(cls, school_name, subdivision_name):
        result = ""
        sd = Subdivision.objects.filter(subdivision_name__icontains=subdivision_name).first()
        if sd is not None:
            school = School()
            school.school_name = school_name
            school.school_subdivision = sd
            school.save()
        else:
            result += "Для школы " + school_name + " не найдено Муниципальное Образование " + subdivision_name + "\n"
        return result
    def create_subdivision(self):
        pass