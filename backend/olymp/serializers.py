from rest_framework import serializers
from .models import Person, Employee, Student


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'name', 'sex']


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'name', 'role', 'user']


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name', 'birthday', 'course_study', 'course_participate', 'special_needs', 'teacher', 'contact_phone']