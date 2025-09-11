from rest_framework import serializers
from .models import Food, UserFoodRating

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['id', 'name', 'category']

class UserFoodRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFoodRating
        fields = ['id', 'food', 'trigger_level']