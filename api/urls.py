from django.urls import path
from .views import RoomView, CreateRoomView

urlpatterns = [
    # path after the lash on the urls. Points to api.urls
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view())
]
