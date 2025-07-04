from .models import Blog
from rest_framework import generics
from .serializers import BlogSerializer 
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import render

# GET all blogs
class BlogListAPIView(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

# GET all blogs belonging to authenticated User (to show on their dashboard)
class UserBlogsAPIView(generics.ListAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Blog.objects.filter(author=self.request.user).order_by('-updated_at')
