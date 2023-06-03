from django.urls import path
from .views import main

urlpatterns = [
    # path after the lash on the urls. Points to api.urls
    path('', main)
]
