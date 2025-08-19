from rest_framework import viewsets
from .models import Blog
from .serializers import BlogSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsAuthorOrReadOnly
    
class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-created_at')
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class DiscussionViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.filter(type="discussion").order_by('-created_at')

    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.filter(type="recipe").order_by('-created_at')

    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
