from rest_framework import serializers
from .models import Person, Employee, Student, Olympiada, Application, Subdivision
from django.contrib.auth.models import User


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'name', 'sex']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name', 'birthday', 'course_study', 'course_participate', 'special_needs', 'teacher', 'contact_phone']


class OlympSerializer(serializers.ModelSerializer):
    class Meta:
        model = Olympiada
        fields = ['id', 'olymp_name', 'olymp_date_start', 'olymp_time']   #No creators yet!


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'applied_student', 'applied_olymp', 'application_date', 'application_employee', 'application_status']


class ApplicationStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['application_status']

        
class AppplicationsStatusSertializerMultiple(serializers.Serializer):
    status_dict = serializers.DictField(child=serializers.IntegerField())     

    
class SubdivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subdivision
        fields = ['id', 'subdivision_name']
