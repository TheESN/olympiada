from django.shortcuts import get_object_or_404
from .models import Employee
from .models import Olympiada
from .models import Student
from .models import Application
from .serializers import EmployeeSerializer
from .serializers import OlympSerializer
from .serializers import StudentSerializer
from .serializers import ApplicationSerializer
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
        else:
            output["valid"] = False
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

class ApplicationViewList(ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


