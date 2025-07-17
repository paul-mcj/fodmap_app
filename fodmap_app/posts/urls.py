from django.urls import path
from .views import (
    UserPostsAPIView,
    RecipePostDetailAPIView,
    DiscussionPostDetailAPIView
)

urlpatterns = [
    path('posts/user/', UserPostsAPIView.as_view(), name='user-posts'),
    path('posts/user/recipes/<int:pk>/', RecipePostDetailAPIView.as_view(), name='user-recipe-detail'),
    path('posts/user/discussions/<int:pk>/', DiscussionPostDetailAPIView.as_view(), name='user-discussion-detail'),
]
