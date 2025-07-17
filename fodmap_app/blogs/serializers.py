from rest_framework import serializers
from foods.models import Food
from .models import Blog

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['id', 'name']

class BlogSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Blog
        fields = ["id", "title", "description", "foods", "type", "author", "created_at", "updated_at"]
        read_only_fields = ["author", "created_at", "updated_at"]