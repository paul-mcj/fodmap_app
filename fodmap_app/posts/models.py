from django.conf import settings
from django.core.validators import MinLengthValidator
from django.db import models

class AbstractPost(models.Model):
    # Base Post model for reuse by RecipePost and DiscussionPost.
    blog = models.ForeignKey(
        "blogs.Blog",
        on_delete=models.CASCADE,
        related_name="%(class)ss",  # e.g., "recipeposts", "discussionposts"
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="%(class)ss"
    )
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True  # prevents table creation for AbstractPost
        ordering = ["-created_at", "-updated_at", "-title"]

    def __str__(self):
        return self.title
    
class RecipePost(AbstractPost):
    # Recipe-specific fields
    ingredients = models.TextField(blank=True)
    instructions = models.TextField(blank=True)

class DiscussionPost(AbstractPost):
    # Discussion-specific fields (optional)
    topic = models.CharField(max_length=255, blank=True)
