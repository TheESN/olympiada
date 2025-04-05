import os.path
from django.shortcuts import get_object_or_404
from .models import Student, Application
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

class StudentFromOlympViewList(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def list(self, request, *args, **kwargs):
        # self.queryset = self.queryset.filter(olymp_id = kwargs.get('olymp_id', 1))
        # olymp = Olympiada.objects.filter(pk=kwargs.get('olymp_id', 1))
        students = Student.objects.filter(id__in=Application.objects.filter(olymp__id=kwargs.get('olymp_id', 1)).values_list("student__id", flat=True)).distinct()
        ser = StudentSerializer(students, many=True)
        output = ser.data
        return Response(output)