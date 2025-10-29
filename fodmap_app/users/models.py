from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True, max_length=254)# for login + password recovery
    bio = models.TextField(blank=True, default="", max_length=500)
    # TODO: make sure users cannot enter non-legit image files!
    profile_image = models.ImageField(upload_to="profile_pics/", blank=True, default="profile_pics/default_user.svg", null=True)

    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.username
