from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


# class RoomView(generics.ListAPIView):
#     # makes a list of the contents of the database
#     queryset = Room.objects.all()
#     serializer_class = RoomSerializer

class RoomView(generics.CreateAPIView):
    # enables us to add content to the database
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class GetRoom(APIView):
    serializer_class = RoomSerializer
    # keyword in url is 'code'
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        # infromation about the url from get request
        # looking for any parameters in url
        # get the keyword
        code = request.GET.get(self.lookup_url_kwarg)
        if code == None:
            return Response({'Bad Request': 'Code parameter not found in request'},
                            status=status.HTTP_400_BAD_REQUEST)
        
        room = Room.objects.filter(code=code)
        if len(room) > 0:
            # serialize the room
            # extract the data from the room serializer
            # a python dictionary
            data = RoomSerializer(room[0]).data
            # is the user the host of the room
            data['is_host'] = self.request.session.session_key == room[0].host
            return Response(data, status=status.HTTP_200_OK)
        return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer
    def post(self, request, format=None):
        # Check whether the current user has an active session
        if not self.request.session.exists(self.request.session.session_key):
            
            # if they don't have a session, create it.
            self.request.session.create()

        # Take data and get a python representation of it
        serializer = self.serializer_class(data=request.data)
        
        # check if the data is invalid
        if not serializer.is_valid():
            return Response({"Bad Request", "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST)

        # unpack the serialized data
        guest_can_pause = serializer.data.get("guest_can_pause")
        votes_to_skip = serializer.data.get("votes_to_skip")
        host = self.request.session.session_key

        # If host already have a room, we can update their content
        # rather than make a new room
        queryset = Room.objects.filter(host=host)
        if queryset.exists():
            room = queryset[0]
            room.guest_can_pause = guest_can_pause
            room.votes_to_skip = votes_to_skip

            # save the data for the new room
            room.save(update_fields = ["guest_can_pause",
                                        "votes_to_skip"])
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
        else:
            # create a new room 
            room = Room(host=host, guest_can_pause=guest_can_pause, 
                        votes_to_skip=votes_to_skip)
            room.save()

            # Return infromation about the room just created to the
            # person who sent the request
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        


