from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import CustomUserListAPIView, RegisterNewUserView, CustomTokenObtainPairView, CurrentUserView, LogoutView, check_email, check_username

urlpatterns = [
    path('', CustomUserListAPIView.as_view(), name='user-list'),
    path('register/', RegisterNewUserView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('me/', CurrentUserView.as_view(), name='me'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'), #issues access and refresh tokens as cookies
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('check-username/', check_username, name='check-username'),
    path('check-email/', check_email, name='check-email'),
]