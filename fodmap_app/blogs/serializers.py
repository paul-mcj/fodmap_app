# from django.contrib.auth import get_user_model
# from rest_framework import serializers
# from foods.models import Food
# from .models import Blog

# User = get_user_model()

# class FoodSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Food
#         fields = ['id', 'name']

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username']

# class BlogSerializer(serializers.ModelSerializer):
#     author = UserSerializer(read_only=True)
#     foods = serializers.PrimaryKeyRelatedField(
#         many=True,
#         queryset=Food.objects.all(),
#         write_only=False  # default False, so it's included in output
#     )

#     foods_detail = FoodSerializer(source="foods", many=True, read_only=True)  # for frontend display

#     class Meta:
#         model = Blog
#         fields = ["id", "title", "description", "foods", "foods_detail", "type", "author", "created_at", "updated_at"]
#         read_only_fields = ["author", "created_at", "updated_at"]

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
    foods = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Food.objects.all(),
        write_only=False
    )
    foods_detail = FoodSerializer(source="foods", many=True, read_only=True)

    class Meta:
        model = Blog
        fields = [
            "id", "title", "description", "foods", "foods_detail", 
            "type", "author", "created_at", "updated_at",
            # recipe-specific fields
            "prep_time", "cook_time", "rating", "ingredients", 
            "instructions", "notes", "tips", "storage_details",
        ]
        read_only_fields = ["author", "created_at", "updated_at"]

    def update(self, instance, validated_data):
        request = self.context.get("request")
        if request and request.user != instance.author:
            # Non-authors can only update rating
            allowed_fields = {}
            if "rating" in validated_data:
                allowed_fields["rating"] = validated_data["rating"]
            validated_data = allowed_fields
        return super().update(instance, validated_data)
