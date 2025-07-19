from django.urls import path
from .views import (
    UserPostsAPIView,
    AllPostsAPIView
)

urlpatterns = [
    path("", AllPostsAPIView.as_view(), name="all-posts"),  # matches /api/posts/
    path("user/", UserPostsAPIView.as_view(), name="user-posts"),  # matches /api/posts/user/
]