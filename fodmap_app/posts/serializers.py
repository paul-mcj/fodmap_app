from rest_framework import serializers
from .models import RecipePost, DiscussionPost

class PostSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    blog = serializers.PrimaryKeyRelatedField(read_only=True)
    type = serializers.SerializerMethodField()

    class Meta:
        model = RecipePost # backup default but can be overridden dynamically
        fields = ["id", "content", "author", "blog", "type", "created_at", "updated_at"]
        read_only_fields = ["author", "blog", "type", "created_at", "updated_at"]

    def get_type(self, obj):
        return "recipe" if isinstance(obj, RecipePost) else "discussion"
    
    # Recipe posts include extra fields
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        if isinstance(instance, RecipePost):
            rep["ingredients"] = instance.ingredients
            rep["instructions"] = instance.instructions
        elif isinstance(instance, DiscussionPost):
            rep["topic"] = instance.topic
        return rep