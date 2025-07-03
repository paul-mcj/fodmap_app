from django.conf import settings
from django.core.validators import MinLengthValidator, MinValueValidator, MaxValueValidator
from django.db import models

class Food(models.Model):
    name = models.CharField(unique=True, max_length=100, blank=False, validators=[MinLengthValidator(1)])
    category = models.CharField(max_length=100)
    image = models.ImageField(upload_to='foods/', blank=True, null=True)

    def __str__(self):
        return self.name
    
# unique to individual users
class UserFoodRating(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='food_triggers')
    food = models.ForeignKey(Food, on_delete=models.CASCADE, related_name='triggers')
    trigger_level = models.PositiveSmallIntegerField(null=True, validators=[MinValueValidator(1), MaxValueValidator(10)]) # 0 - 10 scale

    class Meta:
        unique_together = ('user', 'food')

    def __str__(self):
        return f'{self.user.username} rates {self.food.name}: {self.rating}'