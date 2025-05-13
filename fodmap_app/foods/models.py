from django.db import models

class Food(models.Model):
    name = models.CharField(unique=True, max_length=100)
    trigger_level = models.PositiveSmallIntegerField(null=True)
    category = models.CharField(max_length=100)

    def __str__(self):
        return self.name    
