from django.core.validators import MinLengthValidator, MinValueValidator, MaxValueValidator
from django.db import models

class Food(models.Model):
    name = models.CharField(unique=True, max_length=100, blank=False, validators=[MinLengthValidator(1)])
    trigger_level = models.PositiveSmallIntegerField(null=True, validators=[MinValueValidator(1), MaxValueValidator(10)])
    category = models.CharField(max_length=100)

    def __str__(self):
        return self.name