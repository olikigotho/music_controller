from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('join', index),
    path('create', index),
    # dynamic url with the rooms code
    path('room/<str:roomCode>', index)
]