from django.contrib import admin
from .models import RecipePost, DiscussionPost

@admin.register(RecipePost)
class RecipePostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'blog', 'created_at', 'updated_at']

@admin.register(DiscussionPost)
class DiscussionPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'blog', 'created_at', 'updated_at']