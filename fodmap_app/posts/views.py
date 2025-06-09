from .models import Post
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import PostSerializer

# GET all posts
class PostListAPIView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

# GET posts for authenticated logged in user
class UserPostsAPIView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(author=self.request.user).order_by('-updated_at')