from django.shortcuts import render

# Create your views here.
def index(request, *args, **kwargs):
    """
    Renders the index.html template after which react takes
    over and renders content inside of that
    ------------------------------------------------------
    Returns:
        rendered request
    """
    return render(request, 'frontend/index.html')