from django.db import models
import string
import random

def generate_unique_code()-> string:
    """
    Generates a random uppercase ascii string of 6 charactes
    """
    length = 6

    while True:
        # genrate random codes
        code = ''.join(random.choices(string.ascii_uppercase, k=length))

        # check that the code is unique by filtering through the rest of the codes
        if Room.objects.filer(code=code).count() == 0:
            break
    return code



# Create your models here.
class Room(models.Model):

    # uppercase random ascii string to identify room
    code = models.CharField(max_length=8, default="", unique=True)

    # need to keep trach of who is the host
    host = models.CharField(max_length=50, unique=True)

    # can the guest pause
    guest_can_pause = models.BooleanField(null=False, default=False)

    # how many votes are there to skip?
    votes_to_skip = models.IntegerField(null= False, default=1)

    # time created. Automatically updates.
    created_at = models.DateTimeField(auto_now_add=True)