from .models import CustomUser
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer, RegisterUserSerializer

# GET user records
class CustomUserListAPIView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

# POST new user
class RegisterNewUserView(APIView):
    def post(self, req):
        serializer = RegisterUserSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)