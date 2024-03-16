from django.shortcuts import get_object_or_404
from .models import Employee
from .serializers import EmployeeSerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.
class EmployeeViewSet(APIView):
    def get(self, request, id, format=None):
        employee = get_object_or_404(Employee, pk=id)
        ser = EmployeeSerializer(employee)
        return Response(ser.data)
