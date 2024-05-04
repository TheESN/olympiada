from django.shortcuts import get_object_or_404
from .models import Employee
from .models import Olympiada
from .models import Student
from .models import Application
from .serializers import EmployeeSerializer
from .serializers import OlympSerializer
from .serializers import StudentSerializer
from .serializers import ApplicationSerializer
from rest_framework import viewsets
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

class EmployeeViewList(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAuthenticated]

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
        olympiada = get_object_or_404(Olympiada, pk=id)
        ser = OlympSerializer(olympiada)
        return Response(ser.data)

class OlympViewList(ModelViewSet):
    queryset = Olympiada.objects.all()
    serializer_class = OlympSerializer

class ApplicationViewSet(APIView):
    def get(self, request, id, format=None):
        application = get_object_or_404(Application, pk=id)
        ser = ApplicationSerializer(application)
        return Response(ser.data)

class ApplicationViewList(ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
