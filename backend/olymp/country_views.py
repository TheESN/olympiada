import os.path
from django.shortcuts import get_object_or_404
from .models import Country
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .serializers import CountrySerializer

class CountryViewSet(APIView):
    def get(self, request, id, format=None):
        country = get_object_or_404(Country, pk=id)
        ser = CountrySerializer(country)
        output = ser.data
        return Response(output)

class CountryViewList(ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer