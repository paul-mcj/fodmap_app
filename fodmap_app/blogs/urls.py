from django.urls import path
from .views import (
    PublicBlogListAPIView,
    UserBlogListCreateAPIView,
    UserBlogRetrieveUpdateDestroyAPIView,
)

urlpatterns = [
    # Public endpoint: anyone can view all blogs
    path('', PublicBlogListAPIView.as_view(), name='blogs-list'),

    # User-specific endpoints: must be logged in
    path('my/', UserBlogListCreateAPIView.as_view(), name='user-blogs-list-create'),
    path('my/<int:pk>/', UserBlogRetrieveUpdateDestroyAPIView.as_view(), name='user-blog-detail'),
]