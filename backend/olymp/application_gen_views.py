import os.path
from io import BytesIO
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from .models import Olympiada, Employee, Application
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser
from .parse_applications import ApplicationParser
from .serializers import ApplicationSerializer
from .serializers import ApplicationStatusSerializer, AppplicationsStatusSertializerMultiple
from .application_gen_excel import ApplicationGen

class ApplicationGenView(APIView):
    def get(self, request, olymp_id, format=None):
        excel_file = BytesIO()
        excel_wb = ApplicationGen.generate(olymp_id)
        excel_wb.save(excel_file)

        response = HttpResponse(excel_file.getvalue(), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = 'attachment; filename=applications.xlsx'
        return response