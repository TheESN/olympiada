from django.shortcuts import get_object_or_404
from .models import Employee
from .models import Olympiada
from .models import Student
from .models import Application
from .models import Subdivision
from django.contrib.auth.models import User
from .serializers import EmployeeSerializer
from .serializers import OlympSerializer
from .serializers import StudentSerializer
from .serializers import ApplicationSerializer
from .serializers import SubdivisionSerializer
from .serializers import UserSerializer
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
        return Response(ser.data)
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

class SubdivisionViewList(ModelViewSet):
    queryset = Subdivision.objects.all()
    serializer_class = SubdivisionSerializer

class UserViewList(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = [permissions.IsAuthenticated]