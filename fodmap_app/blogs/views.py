from .models import Blog
from rest_framework import generics
from .serializers import BlogSerializer 
from rest_framework.permissions import IsAuthenticated, AllowAny

# Public view: anyone can list blogs (homepage)
class PublicBlogListAPIView(generics.ListAPIView):
    queryset = Blog.objects.all().order_by('-created_at')
    serializer_class = BlogSerializer
    permission_classes = [AllowAny]

# Authenticated user's blogs: list & create
class UserBlogListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Blog.objects.filter(author=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

# Authenticated user's individual blog: retrieve, update, delete
class UserBlogRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Blog.objects.filter(author=self.request.user)

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
