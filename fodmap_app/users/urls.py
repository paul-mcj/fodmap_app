from django.urls import path
from .views import CustomUserListAPIView

urlpatterns = [
    path('', CustomUserListAPIView.as_view(), name='user-list'),
]