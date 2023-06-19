from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer, UpdateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
# Create your views here.

# sessions store informaiton about a particular user"s session:
# self.request.session["name_of_information"] = information

room_code = "room_code"

class RoomView(generics.ListAPIView):
    # enables us to add content to the database
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class GetRoom(APIView):
    serializer_class = RoomSerializer
    # keyword in url is "code"
    lookup_url_kwarg = "code"

    def get(self, request, format=None):
        """
        Handles GET requests to retrieve room details based on the provided room code.
        -----------------------------------------------------------------------------
        Parameters:
            request (HttpRequest): The HTTP request object.
            format (str): The format of the requested data (default: None).
        -----------------------------------------------------------------------------
        Returns:
            Response: The HTTP response containing the room details.
        -----------------------------------------------------------------------------
        Raises:
            HTTPBadRequest (status.HTTP_400_BAD_REQUEST): If the code parameter is not 
            found in the request. HTTPNotFound (status.HTTP_404_NOT_FOUND): If the room 
            with the provided code is not found.
        """
        # infromation about the url from get request
        # looking for any parameters in url
        # get the keyword
        code = request.GET.get(self.lookup_url_kwarg)
        if code == None:
            return Response({"Bad Request": "Code parameter not found in request"},
                            status=status.HTTP_400_BAD_REQUEST)
        
        rooms = Room.objects.filter(code=code)
        # if room doesn't exist
        if not rooms.exists():
            return Response({"Room Not Found": "Invalid Room Code."}, 
                        status=status.HTTP_404_NOT_FOUND)
        # serialize the room
        # extract the data from the room serializer
        # a python dictionary
        room = rooms[0]
        data = RoomSerializer(room).data
        # is the user the host of the room
        data["is_host"] = self.request.session.session_key == room.host
        return Response(data, status=status.HTTP_200_OK)
        

class JoinRoom(APIView):
    # keyword in url is "code"
    lookup_url_kwarg = "code"
    def post(self, request, format=None):
        """
        Handles POST requests to join a room based on the provided room code.
        -----------------------------------------------------------------------------
        Parameters:
            request (HttpRequest): The HTTP request object.
            format (str): The format of the requested data (default: None).
        -----------------------------------------------------------------------------
        Returns:
            Response: The HTTP response indicating the success of joining the room.
        -----------------------------------------------------------------------------
        Raises:
            HTTPBadRequest (status.HTTP_400_BAD_REQUEST): If the code key is not found 
            in the post data.HTTPNotFound (status.HTTP_404_NOT_FOUND): If the room with 
            the provided code is not found.
        """
        # Check whether the current user has an active session
        if not self.request.session.exists(self.request.session.session_key):
            
            # if they don"t have a session, create it.
            self.request.session.create()
        code = request.data.get(self.lookup_url_kwarg)
        if code == None:
            return Response({"Bad Request": "Invalid post data, did not find a code key"},
                            status=status.HTTP_400_BAD_REQUEST)
        rooms = Room.objects.filter(code=code)

        # if room doesn't exist
        if not rooms.exists():
            return Response({"Room Not Found": "Invalid Room Code."}, 
                        status=status.HTTP_404_NOT_FOUND)
        room = rooms[0]
        # make a note that the user is in the room
        # to be able return them to the room if they close the app and come back
        self.request.session[room_code] = code
        return Response({"message": "Room Joined"}, status=status.HTTP_200_OK)
        
        


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer
    def post(self, request, format=None):
        """
        Handles POST requests to create a new room or update an existing room.
        -----------------------------------------------------------------------------
        Parameters:
            request (HttpRequest): The HTTP request object.
            format (str): The format of the requested data (default: None).
        -----------------------------------------------------------------------------
        Returns:
            Response: The HTTP response containing information about the created or updated room.
        -----------------------------------------------------------------------------
        Raises:
            HTTPBadRequest (status.HTTP_400_BAD_REQUEST): If the request data is invalid.
        """
        # Check whether the current user has an active session
        if not self.request.session.exists(self.request.session.session_key):
            
            # if they don"t have a session, create it.
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
        rooms = Room.objects.filter(host=host)
        if rooms.exists():
            room = rooms[0]
            room.guest_can_pause = guest_can_pause
            room.votes_to_skip = votes_to_skip

            # save the data for the new room
            room.save(update_fields = ["guest_can_pause",
                                        "votes_to_skip"])
             #store infomation of the host
            self.request.session[room_code] = room.code
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
        else:
            # create a new room 
            room = Room(host=host, guest_can_pause=guest_can_pause, 
                        votes_to_skip=votes_to_skip)
            room.save()

            #store infomation of the host
            self.request.session[room_code] = room.code
            # Return infromation about the room just created to the
            # person who sent the request
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
 
class UserInRoom(APIView):
    def get(self, request, format=None):
        """
        Handles GET requests to retrieve the room code associated with the current user's session.
        -----------------------------------------------------------------------------
        Parameters:
            request (HttpRequest): The HTTP request object.
            format (str): The format of the requested data (default: None).
        -----------------------------------------------------------------------------
        Returns:
            JsonResponse: The JSON response containing the room code.
        -----------------------------------------------------------------------------
        Notes:
            This assumes that the user's session has been created.

        """
        # Check whether the current user has an active session
        if not self.request.session.exists(self.request.session.session_key):
                
            # if they don"t have a session, create it.
            self.request.session.create()
        
        # collect the room code
        data = {
            "code": self.request.session.get(room_code)
        }
        return JsonResponse(data, status=status.HTTP_200_OK)
        
class LeaveRoom(APIView):
    """
        Handles POST requests to remove the user from the room and delete the room if the host leaves.
        -----------------------------------------------------------------------------
        Parameters:
            request (HttpRequest): The HTTP request object.
            format (str): The format of the requested data (default: None).
        -----------------------------------------------------------------------------
        Returns:
            Response: The HTTP response indicating the success of the operation.

        """
    def post(self, request, format=None):
        # check if the person has a code
        if room_code in self.request.session:
            # remove code from a users session 
            self.request.session.pop(room_code)
            # get the hosts id
            host_id = self.request.session.session_key
            # figure our which room belongs to the host
            room_results = Room.objects.filter(host=host_id)
            # delete the room if the host leaves
            if len(room_results) > 0:
                room = room_results[0]
                room.delete()
        return Response({"Message": "Success"}, 
                        status=status.HTTP_200_OK)
        
class UpdateRoom(APIView):
    serializer_class = UpdateRoomSerializer
    def patch(self, request, format=None):
        """
        Handles PATCH requests to update the room settings.
        -----------------------------------------------------------------------------
        Parameters:
            request (HttpRequest): The HTTP request object.
            format (str): The format of the requested data (default: None).
        -----------------------------------------------------------------------------
        Returns:
            Response: The HTTP response containing the updated room data.
        -----------------------------------------------------------------------------
        Raises:
            HTTPBadRequest (status.HTTP_400_BAD_REQUEST): If the request data is invalid.
            HTTPNotFound (status.HTTP_404_NOT_FOUND): If the room is not found.
            HTTPForbidden (status.HTTP_403_FORBIDDEN): If the user is not the host of the room.
        """
        # Check whether the current user has an active session
        if not self.request.session.exists(self.request.session.session_key):
            
            # if they don"t have a session, create it.
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)

        # check if the data is invalid
        if not serializer.is_valid():
            return Response({"Bad Request": "Invalid Data..."}, 
                            status=status.HTTP_400_BAD_REQUEST)
        # load the code
        guest_can_pause = serializer.data.get("guest_can_pause")
        votes_to_skip = serializer.data.get("votes_to_skip")
        code = serializer.data.get("code")

        # find the room
        rooms = Room.objects.filter(code=code)
        if not rooms.exists():
            return Response({"msg": "Room not found"},
                            status=status.HTTP_404_NOT_FOUND)
        room = rooms[0]
        # check that the owner is the user trying to update the room is the host
        # and extra layer of security
        user_id = self.request.session.session_key
        if room.host != user_id:
            return Response({"msg": "You are not the host of this room."},
                            status=status.HTTP_403_FORBIDDEN)

        room.guest_can_pause = guest_can_pause
        room.votes_to_skip = votes_to_skip
        room.save(update_fields=["guests_can_pause", "votes_to_skip"]) 
        return Response(RoomSerializer(room).data, status=HTTP_200_OK)

