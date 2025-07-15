from rest_framework import serializers
from .models import RecipePost, DiscussionPost, AbstractPost

class PostSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    class Meta:
        model = AbstractPost
        fields = ['id', 'title', 'body', 'created_at', 'updated_at', 'author', 'blog', 'type']

    def get_type(self, obj):
        return "recipe" if isinstance(obj, RecipePost) else "discussion"

class RecipePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipePost
        fields = "__all__"

class DiscussionPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscussionPost
        fields = "__all__"