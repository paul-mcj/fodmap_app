from django.conf import settings
from django.core.validators import MinLengthValidator
from django.db import models

# Users cannot edit or delete journal posts, only initially create and read -- this is a permanent log only accessible to validated users.
class JournalEntry(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='journals')
    body = models.TextField(blank=False, validators=[MinLengthValidator(10)])
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.user.username} - {self.created_at.strftime("%Y-%m-%d")}'
