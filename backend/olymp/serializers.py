from rest_framework import serializers
from .models import Person, Employee, Student, Olympiada, Application, Subdivision, School
from django.contrib.auth.models import User


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ['id', 'name', 'sex', 'gender']

#class UserSerializer(DynamicFieldsModelSerializer):
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

class UserSerializer_confident(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

gender = serializers.SerializerMethodField('')

def getGender(self, obj):
    return obj.sex.username

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name', 'birthday', 'course_study', 'course_participate', 'special_needs', 'teacher', 'contact_phone']


class OlympSerializer(serializers.ModelSerializer):
    class Meta:
        model = Olympiada
        fields = ['id', 'olymp_name', 'olymp_date_start', 'olymp_time']   #No creators yet!


class ApplicationSerializer(serializers.ModelSerializer):
    applied_student = StudentSerializer(read_only=True)
    applied_student_id = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all(), source="applied_student", write_only=True)
    applied_olymp = OlympSerializer(read_only=True)
    applied_olymp_id = serializers.PrimaryKeyRelatedField(queryset=Olympiada.objects.all(), source="applied_olymp", write_only=True)
    class Meta:
        model = Application
        fields = ['id', 'applied_student', 'applied_student_id', 'applied_olymp', 'applied_olymp_id', 'application_date', 'application_employee', 'application_status']


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


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ['id', 'school_name', 'school_subdivision']



