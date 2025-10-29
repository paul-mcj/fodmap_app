from django.contrib.auth.password_validation import validate_password
import imghdr
from .models import CustomUser
import re
from rest_framework import serializers

class CustomUserSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=False)
    # profile_image = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username', 'bio', 'profile_image', 'date_joined']

    def validate_profile_image(self, value):
        valid_extensions = ['jpeg', 'jpg', 'png', 'gif', 'svg']
        ext = imghdr.what(value) or value.name.split('.')[-1].lower()
        if ext not in valid_extensions:
            raise serializers.ValidationError("Invalid image format. Please upload JPG, PNG, GIF, or SVG.")
        return value

    def get_profile_image(self, obj):
        request = self.context.get('request')
        if obj.profile_image and hasattr(obj.profile_image, 'url'):
            return request.build_absolute_uri(obj.profile_image.url)
        else:
            default_path = '/media/profile_pics/default_user.svg'
            return request.build_absolute_uri(default_path)

# class CustomUserSerializer(serializers.ModelSerializer):
#     profile_image = serializers.SerializerMethodField()

#     class Meta:
#         model = CustomUser
#         # for general API consumption -- does NOT expose password field
#         fields = ['id', 'email', 'username', 'bio', 'profile_image', 'date_joined']

#     def get_profile_image(self, obj):
#         request = self.context.get('request')
#         if obj.profile_image and hasattr(obj.profile_image, 'url'):
#             return request.build_absolute_uri(obj.profile_image.url)
#         else:
#             # Use the new default in media/profile_pics/
#             default_path = '/media/profile_pics/default_user.svg'
#             return request.build_absolute_uri(default_path)

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'bio', 'profile_image']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_username(self, value):
        if not re.match(r"^[a-zA-Z0-9_]+$", value):
            raise serializers.ValidationError("Username may only contain letters, numbers, and underscores.")
        if len(value) < 3 or len(value) > 20:
            raise serializers.ValidationError("Username must be between 3 and 20 characters.")
        return value

    def validate_password(self, value):
        validate_password(value)  # Uses Django’s validators (MinLengthValidator etc.)
        return value

    # def create(self, validated_data):
    #     user = CustomUser.objects.create_user(
    #         username=validated_data['username'],
    #         email=validated_data['email'],
    #         password=validated_data['password'],
    #         bio=validated_data.get('bio', ''),
    #         profile_image=validated_data.get('profile_image', None)
    #     )
    #     return user
    def create(self, validated_data):
        profile_image = validated_data.pop('profile_image', None)
        user = CustomUser.objects.create_user(**validated_data)
        if profile_image:
            user.profile_image = profile_image
            user.save()
        return user
