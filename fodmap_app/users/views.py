from .models import CustomUser
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
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
    
# store JWTs in HttpOnly Cookies (override TokenObtainPairView POST to set)
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, req, *args, **kwargs):
        serializer = self.get_serializer(data=req.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        # Get tokens from serializer
        tokens = serializer.validated_data
        access = tokens.get('access')
        refresh = tokens.get('refresh')

        # Create response and set tokens as HttpOnly cookies
        response = Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        response.set_cookie(
            key='access',
            value=access,
            httponly=True,
            secure=False,  # TODO: True in production (requires HTTPS)
            samesite='Lax'
        )
        response.set_cookie(
            key='refresh',
            value=refresh,
            httponly=True,
            secure=False,  # TODO: True in production (requires HTTPS)
            samesite='Lax'
        )

        return response