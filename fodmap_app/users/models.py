from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True) # for login + password recovery
    bio = models.TextField(blank=True, default="")
    # TODO: add a default image for users who skip setting one. No need to erase migrations, Django is smart enough for this schema change, just make migrations. Validate format, make sure users cannot enter non-legit image files!
    profile_image = models.ImageField(upload_to="profile_pics/", blank=True, null=True)

    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.username
