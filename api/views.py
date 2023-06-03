from django.shortcuts import render
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room

# Create your views here.


class RoomView(generics.ListAPIView):
    # makes a list of the contents of the database
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

# class RoomView(generics.CreateAPIView):
#     # enables us to add content to the database
#     queryset = Room.objects.all()
#     serializer_class = RoomSerializer