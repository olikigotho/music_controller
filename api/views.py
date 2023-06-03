from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

# location after the slash on the url
def main(request):
    """
    Content which will be shown on the webpage

    Returns:
        response: http response object
    """
    return (HttpResponse('hello'))