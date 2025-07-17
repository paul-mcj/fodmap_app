from django.contrib import admin
from .models import RecipePost, DiscussionPost

@admin.register(RecipePost)
class RecipePostAdmin(admin.ModelAdmin):
    list_display = ("blog", "author", "short_content", "created_at", "updated_at")
    search_fields = ("content", "author__username", "blog__title")
    list_filter = ("created_at", "updated_at", "blog__type")
    ordering = ("-created_at",)

    def short_content(self, obj):
        return obj.content[:50] + "..." if len(obj.content) > 50 else obj.content
    short_content.short_description = "Content"

@admin.register(DiscussionPost)
class DiscussionPostAdmin(admin.ModelAdmin):
    list_display = ("blog", "author", "short_content", "created_at", "updated_at")
    search_fields = ("content", "author__username", "blog__title")
    list_filter = ("created_at", "updated_at", "blog__type")
    ordering = ("-created_at",)

    def short_content(self, obj):
        return obj.content[:50] + "..." if len(obj.content) > 50 else obj.content
    short_content.short_description = "Content"

class RecipePostInline(admin.TabularInline):
    model = RecipePost
    extra = 0
    readonly_fields = ("author", "content", "created_at", "updated_at")


class DiscussionPostInline(admin.TabularInline):
    model = DiscussionPost
    extra = 0
    readonly_fields = ("author", "content", "created_at", "updated_at")