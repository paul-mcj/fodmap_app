from rest_framework import serializers
from foods.models import Food
from .models import Blog

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['id', 'name']

class BlogSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()  # show username instead of id
    foods = serializers.PrimaryKeyRelatedField(
    many=True,
    queryset=Food.objects.all()
)
    class Meta:
        model = Blog
        fields = ['id', 'author', 'title', 'description', 'type', 'foods', 'created_at', 'updated_at']
