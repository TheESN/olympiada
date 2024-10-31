import os.path
from django.shortcuts import get_object_or_404
from .models import Olympiada, Employee
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from .parse_applications import ApplicationParser

class ApplicationUploadView(APIView):
    parser_classes = [FileUploadParser]
    def put(self, request, olymp_id, filename, format=None):
        folder='folder'
        result = {"error": ""}

        file_obj = request.data['file']
        full_path = os.path.join(folder, filename)
        with open(full_path, 'wb') as f:
            f.write(file_obj.read())
        olympiada = get_object_or_404(Olympiada, pk=olymp_id)
        employee = Employee.objects.filter(user__id=request.user.id)
        result["error"] += ApplicationParser.parse_excel(full_path, olympiada, employee)
        return Response(result)