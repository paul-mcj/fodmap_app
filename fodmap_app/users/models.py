from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
import os

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True, max_length=254)# for login + password recovery
    bio = models.TextField(blank=True, default="", max_length=500)
    # TODO: make sure users cannot enter non-legit image files!
    profile_image = models.ImageField(upload_to="profile_pics/", blank=True, default="profile_pics/default_user.svg", null=True)

    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.username

@receiver(pre_save, sender=CustomUser)
def auto_delete_old_file_on_change(sender, instance, **kwargs):
    """
    Deletes the old profile image file from the filesystem
    when a user uploads a new one.
    """
    if not instance.pk:
        # Skip for new users (no existing record yet)
        return

    try:
        old_file = CustomUser.objects.get(pk=instance.pk).profile_image
    except CustomUser.DoesNotExist:
        return

    new_file = instance.profile_image

    # If there's no old file or it hasn't changed, skip cleanup
    if not old_file or old_file == new_file:
        return

    # Prevent deletion of the shared default image
    if "default_user.svg" in old_file.name:
        return

    # Remove old file if it exists
    if old_file and os.path.isfile(old_file.path):
        os.remove(old_file.path)
