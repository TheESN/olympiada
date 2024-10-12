import os.path
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.parsers import FileUploadParser
from .models import Employee
from .models import Olympiada
from .models import Student
from .models import Application
from .models import Subdivision
from .models import sex, ROLES
from .models import School
from django.contrib.auth.models import User
from .serializers import EmployeeSerializer
from .serializers import OlympSerializer
from .serializers import StudentSerializer
from .serializers import ApplicationSerializer
from .serializers import ApplicationStatusSerializer, AppplicationsStatusSertializerMultiple
from .serializers import SubdivisionSerializer
from .serializers import UserSerializer
from .serializers import SchoolSerializer
from .serializers import UserSerializer, UserSerializer_confident
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import permissions


# Create your views here.
class EmployeeViewSet(APIView):
    def get(self, request, id, format=None):
        employee = get_object_or_404(Employee, pk=id)
        ser = EmployeeSerializer(employee)
        return Response(ser.data)
    def delete(self, request, id, format=None):
        output = {"valid": True, "message": ''}
        if request.method == 'DELETE':
            employee = get_object_or_404(Employee, pk=id)
            try:
                output["employee"] = employee.id
                employee.delete()
                output["message"] = 'Успешно!'
            except:
                del output["employee"]
                output["valid"] = False
                output["message"] = 'Ошибка!'
            return Response(output)
    def put(self, request, id, format=None):
        output = {"valid": False}
        employee = get_object_or_404(Employee, pk=id)
        ser = EmployeeSerializer(employee, data=request.data)
        if ser.is_valid():
            ser.save()
            output["valid"] = True
        return Response(output)

class AddEmployeeViewSet(APIView):
    def post(self, request):
        output = {"valid": False}
        # ser = EmployeeSerializer(olympiada, request.data)
        if request.method == "POST":
            try:
                ser = EmployeeSerializer(data=request.data)
                if ser.is_valid():
                    ser.save()
                    output["valid"] = True
                else:
                    output["valid"] = False
                    output['msg'] = 'Проверьте правильность заполнения формы'
            except Exception as e:
                output['valid'] = False
                output['msg'] = 'Ошибка при сохранении'
        return Response(output)

class EmployeeViewList(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    #permission_classes = [permissions.IsAuthenticated]

class StudentViewSet(APIView):
    def get(self, request, id, format=None):
        student = get_object_or_404(Student, pk=id)
        ser = StudentSerializer(student)
        return Response(ser.data)

class StudentViewList(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class OlympViewSet(APIView):
    def get(self, request, id, format=None):
        #id = request.GET['id']
        olympiada = get_object_or_404(Olympiada, pk=id)
        ser = OlympSerializer(olympiada)
        return Response(ser.data)

    def delete(self, request, id, format=None):
        output = {"valid": True, "message": ''}
        if request.method == 'DELETE':
            olympiada = get_object_or_404(Olympiada, pk=id)
            try:
                output["olympiada"] = olympiada.id
                olympiada.delete()
                output["message"] = 'Успешно!'
            except:
                del output["olympiada"]
                output["valid"] = False
                output["message"] = 'Ошибка!'
            return Response(output)

    def put(self, request, id, format=None):
        output = {"valid": False}
        olympiada = get_object_or_404(Olympiada, pk=id)
        ser = OlympSerializer(olympiada, data=request.data)
        if ser.is_valid():
            ser.save()
            output["valid"] = True
        return Response(output)

class AddOlympViewSet(APIView):
    def post(self, request):
        output = {"valid": False}
        # ser = OlympSerializer(olympiada, request.data)
        if request.method == "POST":
            try:
                ser = OlympSerializer(data=request.data)
                if ser.is_valid():
                    ser.save()
                    output["valid"] = True
                else:
                    output["valid"] = False
                    output['msg'] = 'Проверьте правильность заполнения формы'
            except Exception as e:
                output['valid'] = False
                output['msg'] = 'Ошибка при сохранении'
        return Response(output)

class OlympViewList(ModelViewSet):
    queryset = Olympiada.objects.all()
    serializer_class = OlympSerializer

class ApplicationViewSet(APIView):
    def get(self, request, id, format=None):
        application = get_object_or_404(Application, pk=id)
        ser = ApplicationSerializer(application)
        output = ser.data
        output["Название"] = application.applied_olymp.olymp_name
        return Response(output)
    def delete(self, request, id, format=None):
        output = {"valid": True, "message": ''}
        if request.method == "DELETE":
            application = get_object_or_404(Application, pk=id)
            try:
                output["application"] = application.id
                application.delete()
                output["message"] = 'Успешно!'
            except:
                del output["application"]
                output["valid"] = False
                output["message"] = 'Ошибка!'
            return Response(output)

    def put(self, request, id, format=None):
        application = get_object_or_404(Application, pk=id)
        ser = ApplicationSerializer(application, data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)

class ApplicationViewList(ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

class AddApplicationViewSet(APIView):
    def post(self, request):
        output = {"valid": False}
        if request.method == "POST":
            try:
                ser = ApplicationSerializer(data=request.data)
                if ser.is_valid():
                    ser.save()
                    output["valid"] = True
                else:
                    output["valid"] = False
                    output['msg'] = 'Проверьте правильность заполнения формы'
            except Exception as e:
                output['valid'] = False
                output['msg'] = 'Ошибка при сохранении'
            return Response(output)

class ChangeApplicationStatus(APIView):
    def put(self, request, id, format=None):
        if request.method == "PUT":
            application = get_object_or_404(Application, pk=id)
            ser = ApplicationStatusSerializer(application, data=request.data)
            if ser.is_valid():
                ser.save()
                return Response(ser.data)
            return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response("Error")

class ChangeApplicationStatusMultiple(APIView):
    def put(self, request, format=None):
        if request.method == "PUT":
            ser = AppplicationsStatusSertializerMultiple(data=request.data)
            if ser.is_valid():
                for key in ser["status_dict"].value:
                    # print(key, ser["status_dict"].value[key])
                    application = get_object_or_404(Application, pk=key)
                    application.application_status = ser["status_dict"].value[key]
                    application.save()
                # print(ser["status_dict"].value)
                return Response(ser.data)
            return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response("Error")

class SubdivisionViewSet(APIView):
    def get(self, request, id, format=None):
        #id = request.GET['id']
        subdivision = get_object_or_404(Subdivision, pk=id)
        ser = SubdivisionSerializer(subdivision)
        return Response(ser.data)
    def put(self, request, id, format=None):
        output = {"valid": False}
        subdivision = get_object_or_404(Subdivision, pk=id)
        ser = SubdivisionSerializer(subdivision, data=request.data)
        if ser.is_valid():
            ser.save()
            output["valid"] = True
        return Response(output)

class AddSubdivisionViewSet(APIView):
    def post(self, request):
        output = {"valid": False}
        if request.method == "POST":
            try:
                ser = SubdivisionSerializer(data=request.data, many=True)
                if ser.is_valid():
                    ser.save()
                    output["valid"] = True
                else:
                    output["valid"] = False
                    output['msg'] = 'Проверьте правильность заполнения формы'
            except Exception as e:
                output['valid'] = False
                output['msg'] = 'Ошибка при сохранении'
        return Response(output)


class UserViewSet(APIView):
    def get(self, request, id, format=None):
        #id = request.GET['id']
        user = get_object_or_404(User, pk=id)
        ser = UserSerializer(user)
        return Response(ser.data)

class AddUserViewSet(APIView):
    def post(self, request):
        output = {"valid": False}
        if request.method == "POST":
            try:
                ser = UserSerializer(data=request.data)
                if ser.is_valid():
                    User.objects.create_user(
                        ser.initial_data['username'],
                        ser.initial_data['email'],
                        ser.initial_data['password']
                    )
                    output["valid"] = True
                else:
                    output["valid"] = False
                    output['msg'] = 'Проверьте правильность заполнения формы'
            except Exception as e:
                output['valid'] = False
                output['msg'] = 'Ошибка при сохранении'
        return Response(output)

class SubdivisionViewList(ModelViewSet):
    queryset = Subdivision.objects.all()
    serializer_class = SubdivisionSerializer

class UserViewList(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer_confident
    #permission_classes = [permissions.IsAuthenticated]

class GenderViewList(APIView):
    def get(self, request):
        sex_dict = dict(sex)
        return Response(sex_dict)

class RoleViewList(APIView):
    def get(self, request):
        role_dict = dict(ROLES)
        return Response(role_dict)

class SchoolViewList(ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer

class SchoolViewSet(APIView):
    def get(self, request, id, format=None):
        school = get_object_or_404(School, pk=id)
        ser = SchoolSerializer(school)
        return Response(ser.data)
    def put(self, request, id, format=None):
        output = {"valid": False}
        school = get_object_or_404(School, pk=id)
        ser = SchoolSerializer(school, data=request.data)
        if ser.is_valid():
            ser.save()
            output["valid"] = True
        return Response(output)
    def delete(self, request, id, format=None):
        output = {"valid": True, "message": ''}
        if request.method == "DELETE":
            school = get_object_or_404(Application, pk=id)
            try:
                output["application"] = school.id
                school.delete()
                output["message"] = 'Успешно!'
            except:
                del output["application"]
                output["valid"] = False
                output["message"] = 'Ошибка!'
            return Response(output)

class AddSchoolViewSet(APIView):
    def post(self, request):
        output = {"valid": False}
        if request.method == "POST":
            try:
                ser = SchoolSerializer(data=request.data)
                if ser.is_valid():
                    ser.save()
                    output["valid"] = True
                else:
                    output["valid"] = False
                    output['msg'] = 'Проверьте правильность заполнения формы'
            except Exception as e:
                output['valid'] = False
                output['msg'] = 'Ошибка при сохранении'
        return Response(output)

class FileUploadView(APIView):
    parser_classes = [FileUploadParser]
    def put(self, request, filename, format=None):
        folder='folder'

        file_obj = request.data['file']
        full_path = os.path.join(folder, filename)
        with open(full_path, 'wb') as f:
            f.write(file_obj.read())

        return Response(status=204)
