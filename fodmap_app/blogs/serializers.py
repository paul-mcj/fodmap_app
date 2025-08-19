from django.contrib.auth import get_user_model
from rest_framework import serializers
from foods.models import Food
from .models import Blog

User = get_user_model()

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class BlogSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    foods = FoodSerializer(many=True, read_only=True)

    class Meta:
        model = Blog
        fields = ["id", "title", "description", "foods", "type", "author", "created_at", "updated_at"]
        read_only_fields = ["author", "created_at", "updated_at"]