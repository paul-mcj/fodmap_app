from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import CustomUserListAPIView, RegisterNewUserView

urlpatterns = [
    path('', CustomUserListAPIView.as_view(), name='user-list'),
    path('register/', RegisterNewUserView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]