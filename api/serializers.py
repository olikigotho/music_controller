# translate the python room into a json format

from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    """
    Serializer for the Room model.
    """
    class Meta:
        """
        Metadata for the RoomSerializer.
        """
        model = Room
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at')
        
class CreateRoomSerializer(serializers.ModelSerializer):
    """
    Serializer for creating a new Room instance.
    """
    class Meta:
        """
        Metadata for the CreateRoomSerializer.
        """
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip')

class UpdateRoomSerializer(serializers.ModelSerializer):
    """
    Serializer for creating a new Room instance.
    """

    # redifined code field so that it doesn't need to be unique
    code = serializers.CharField(validators = [])
    class Meta:
        """
        Metadata for the CreateRoomSerializer.
        """
        model = Room
        # if the code is not unique, the information is invalid
        fields = ('guest_can_pause', 'votes_to_skip', 'code')