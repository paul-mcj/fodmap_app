from .models import CustomUser
from rest_framework import generics
from .serializers import CustomUserSerializer

# GET user records
class CustomUserListAPIView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer