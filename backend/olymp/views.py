from django.shortcuts import get_object_or_404
from .models import Employee
from .models import Olympiada
from .serializers import EmployeeSerializer
from .serializers import OlympSerializer
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response


# Create your views here.
class EmployeeViewSet(APIView):
    def get(self, request, id, format=None):
        employee = get_object_or_404(Employee, pk=id)
        ser = EmployeeSerializer(employee)
        return Response(ser.data)

class EmployeeViewList(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class OlympViewSet(APIView):
    def get(self, request, id, format=None):
        #id = request.GET['id']
        olympiada = get_object_or_404(Olympiada, pk=id)
        ser = OlympSerializer(olympiada)
        return Response(ser.data)

    def post(self, request, format=None):
        ser = OlympSerializer(data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data, status=status.HTTP_201_CREATED)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)

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
