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
from .protocol_gen_excel import ProtocolGen

class ProtocolGenView(APIView):
    def get(self, request, olymp_id, format=None):
        excel_file = BytesIO()
        excel_wb = ProtocolGen.generate(olymp_id)
        excel_wb.save(excel_file)

        response = HttpResponse(excel_file.getvalue(), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = 'attachment; filename=protocol.xlsx'
        return response