from django.http import JsonResponse
from .models import CustomUser
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from .serializers import CustomUserSerializer, RegisterUserSerializer

# GET user records
class CustomUserListAPIView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]

# GET authenticated single user / PATCH update user
class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, req):
        serializer = CustomUserSerializer(req.user)
        return Response(serializer.data)

    def patch(self, req):
        serializer = CustomUserSerializer(
            req.user, data=req.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        access_token = tokens.get('access')
        refresh_token = tokens.get('refresh')

        # Create response and set tokens as HttpOnly cookies
        response = Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        response.set_cookie(
            key="access",
            value=access_token,
            httponly=True,
            samesite="Lax",
            secure=False, #TODO: change to True before deploying
        )

        response.set_cookie(
            key="refresh",
            value=refresh_token,
            httponly=True,
            samesite="Lax",
            secure=False, #TODO: change to True before deploying
        )

        return response
    
# POST logout current user
class LogoutView(APIView):
    def post(self, req):
        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

        # clear httpOnly cookies
        response.delete_cookie("access")
        response.delete_cookie("refresh")

        return response

# Check if username exists
@api_view(['GET'])
def check_username(request):
    username = request.query_params.get('username', None)
    if not username:
        return Response({"available": False, "detail": "No username provided"}, status=400)
    is_taken = CustomUser.objects.filter(username__iexact=username).exists()
    return Response({"available": not is_taken})

# Check if email exists
@api_view(['GET'])
def check_email(request):
    email = request.query_params.get('email', None)
    if not email:
        return Response({"available": False, "detail": "No email provided"}, status=400)
    is_taken = CustomUser.objects.filter(email__iexact=email).exists()
    return Response({"available": not is_taken})