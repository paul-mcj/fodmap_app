from .models import Post
from rest_framework import generics
from .serializers import PostSerializer

# GET post records
class PostListAPIView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer