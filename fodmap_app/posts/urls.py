from django.urls import path
from .views import PostListAPIView, UserPostsAPIView

urlpatterns = [
    path('', PostListAPIView.as_view(), name='post-list'),
    path('user/', UserPostsAPIView.as_view(), name='user-posts'),
]