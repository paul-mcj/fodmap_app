from django.conf import settings
from django.core.validators import MinLengthValidator
from django.db import models

class Blog(models.Model):
    TYPE_CHOICES = [
        ("recipe", "Recipe"),
        ("discussion", "Discussion"),
    ]

    title = models.CharField(unique=True, max_length=255, blank=False, validators=[MinLengthValidator(1)])
    description = models.TextField(blank=False, validators=[MinLengthValidator(1)])
    foods = models.ManyToManyField('foods.Food', blank=True) # Food tags for recipes
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='blogs')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title