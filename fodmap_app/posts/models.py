from django.conf import settings
from django.core.validators import MinLengthValidator
from django.db import models

class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    body = models.TextField(blank=False, validators=[MinLengthValidator(10)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at", "-updated_at"]
    # TODO: eventually, other app models will extend this model -- when they do, abstract = True will prevent a table being migrated unnecessarily. For testing, it can be commented out
    #     abstract = True

    def __str__(self):
        return self.author.username
