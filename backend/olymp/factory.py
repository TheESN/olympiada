from django.db.models.expressions import result

import datetime
from .models import Subdivision, School, Person, teacher
from .models import Application, Country, Student, Olympiada, Employee, ROLES

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

    @classmethod
    def create_application(cls, data_array, olympiada, employee):
        result = ""
        student_name = cls.get_student_name(data_array)
        print("Got Student Name")
        student = cls.get_student(data_array, student_name)
        if student is None:
            result += "Студент " + student_name + " не был создан или найден \n"
            return result
        print("Got Student")
        subdivision, result = cls.get_subdivision(data_array, student_name, result)
        if subdivision is None:
            return result
        print("Got Subdivision")
        school, result = cls.get_school(data_array, subdivision, student_name, result)
        print("Got School")
        teacher, created = Employee.objects.get_or_create(name=data_array[12].value, role=ROLES[2][0])
        print("Got Teacher")
        if created:
            result += "Для студента " + student_name + " добавлен новый учитель " + data_array[12].value + "\n"
        participate = data_array[11].value
        print("Got participate class")
        print(olympiada)
        print(employee)
        try:
            app = Application()
            app.student = student
            app.olymp = olympiada
            app.employee = employee
            app.participate = participate
            app.school = school
            app.teacher = teacher
            app.subdivision = subdivision
            app.save()
        except Exception as e:
            print(e)
            result += "Ошибка при добавлении заявки студента " + student_name + "\n"
        return result

    @classmethod
    def get_student_name(cls, data_array):
        student_name = data_array[1].value + " " + data_array[2].value
        if data_array[3].value is not None:
            student_name += " " + data_array[3].value
        return student_name

    @classmethod
    def get_student(cls, data_array, student_name):
        sex = 0 if 'м' in data_array[4].value.lower() else 1
        print("Got Sex")
        birthday = data_array[5].value
        if isinstance(birthday, datetime.datetime):
            birthday = birthday.date()
        elif isinstance(birthday, str):
            birthday = datetime.datetime.strptime(birthday, "%d.%m.%Y") #"%Y-%m-%d %H:%M:%S").date()
        print("Got Birthday")
        try:
            country = Country.objects.get(country_name=data_array[6].value)
        except:
            return None

        student, created = Student.objects.get_or_create(name=student_name, sex=sex, birthday=birthday,
                                                         defaults={"course_study": data_array[11].value,
                                                                   "special_needs": 'не' not in data_array[7].value.lower(),
                                                                   "contact_phone": data_array[13].value,
                                                                   "country": country})
        # student = Student.objects.filter(name__icontains=student_name, sex=sex, birthday=birthday).first()
        return student

    @classmethod
    def get_school(cls, data_array, subdivision, student_name, result):
        # print(data_array[9].value)
        # print(subdivision.subdivision_name)
        school = School.objects.filter(school_subdivision__id=subdivision.id, school_name__icontains=data_array[9].value).first()
        if school is None:
            cls.create_school(data_array[9].value, subdivision.subdivision_name)
            result += "Для студента " + student_name + " добавлена новая школа " + data_array[9].value + "\n"
        return school, result

    @classmethod
    def get_subdivision(cls, data_array, student_name, result):
        subdivision = Subdivision.objects.filter(subdivision_name__icontains=data_array[8].value).first()
        if subdivision is None:
            result += "Для студента " + student_name + " не указано муниципальное образование \n"
        return subdivision, result
