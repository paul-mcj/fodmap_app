from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    bio = models.TextField(blank=True, null=True)
    # TODO: add a default image for users who skip setting one. No need to erase migrations, Django is smart enough for this schema change, just make migrations
    profile_image = models.ImageField(upload_to="profiles/", blank=True, null=True)