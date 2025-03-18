import os.path
from django.shortcuts import get_object_or_404
from .models import Participant
from rest_framework import viewsets, status
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .serializers import ParticipantSerializer

class ParticipantViewSet(APIView):
    def get(self, request, id, format=None):
        #id = request.GET['id']
        participant = get_object_or_404(Participant, pk=id)
        ser = ParticipantSerializer(participant)
        return Response(ser.data)
    def put(self, request, id, format=None):
        output = {"valid": False}
        participant = get_object_or_404(Participant, pk=id)
        ser = ParticipantSerializer(participant, data=request.data)
        if ser.is_valid():
            ser.save()
            output["valid"] = True
        return Response(output)

class AddParticipantViewSet(APIView):
    def post(self, request):
        output = {"valid": False}
        if request.method == "POST":
            try:
                ser = ParticipantSerializer(data=request.data, many=True)
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

class ParticipantViewList(ModelViewSet):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer