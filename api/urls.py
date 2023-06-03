from django.urls import path
from .views import RoomView

urlpatterns = [
    # path after the lash on the urls. Points to api.urls
    path('home', RoomView.as_view())
]
