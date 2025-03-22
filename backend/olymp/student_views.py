import os.path
from django.shortcuts import get_object_or_404
from .models import Student
from rest_framework import viewsets, status
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .serializers import StudentSerializer

class StudentViewSet(APIView):
    def get(self, request, id, format=None):
        student = get_object_or_404(Student, pk=id)
        ser = StudentSerializer(student)
        return Response(ser.data)

class StudentViewList(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer