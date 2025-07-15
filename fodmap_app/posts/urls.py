from django.urls import path
from .views import UserPostsAPIView, RecipePostViewSet, DiscussionPostViewSet, BlogPostsAPIView, RecipePostDetailAPIView, DiscussionPostDetailAPIView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"recipes", RecipePostViewSet)
router.register(r"discussions", DiscussionPostViewSet)

urlpatterns = [
    path('user/posts/', UserPostsAPIView.as_view(), name='user-posts'), # GET all posts created by logged-in user
    path('user/recipes/<int:pk>/', RecipePostDetailAPIView.as_view(), name='user-recipe-detail'), # CRUD endpoint for specific recipe post
    path('user/discussions/<int:pk>/', DiscussionPostDetailAPIView.as_view(), name='user-discussion-detail'), # CRUD endpoint for specific discussion post
    path('blogs/<int:blog_id>/posts/', BlogPostsAPIView.as_view(), name='blog-posts'), # Public GET API endpoint for all posts of any single blog
]