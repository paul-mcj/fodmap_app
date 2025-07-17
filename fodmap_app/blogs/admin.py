from django.contrib import admin
from .models import Blog
from posts.admin import RecipePostInline, DiscussionPostInline

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "type", "created_at", "updated_at")
    list_filter = ("type", "created_at", "updated_at")
    search_fields = ("title", "description", "author__username")
    ordering = ("-created_at",)

    # make foods show up in a tag-style
    filter_horizontal = ("foods",)

    inlines = [RecipePostInline, DiscussionPostInline]