from django.conf import settings
from django.core.validators import MinLengthValidator
from django.db import models

class AbstractPost(models.Model):
    # Base Post model for reuse by RecipePost and DiscussionPost.
    content = models.TextField(blank=False, validators=[MinLengthValidator(1)])
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="%(class)ss"
    )
    blog = models.ForeignKey(
        "blogs.Blog",
        on_delete=models.CASCADE,
        related_name="%(class)s_posts"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True  # prevents table creation for AbstractPost
        ordering = ["-created_at", "-updated_at"]

    def __str__(self):
        return f"{self.author.username} on {self.blog.title}"
    
class RecipePost(AbstractPost):
    # Recipe-specific fields
    ingredients = models.TextField(blank=True)
    instructions = models.TextField(blank=True)

class DiscussionPost(AbstractPost):
    # Discussion-specific fields (optional)
    # topic = models.CharField(max_length=255, blank=True)
    pass