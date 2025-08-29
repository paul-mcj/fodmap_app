from .models import Blog
from .serializers import BlogSerializer
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from .permissions import IsAuthorOrReadOnly
    
class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-created_at')
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my(self, request):
        blogs = Blog.objects.filter(author=request.user).order_by('-created_at')
        serializer = self.get_serializer(blogs, many=True)
        return Response(serializer.data)

class DiscussionViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.filter(type="discussion").order_by('-created_at')

    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.filter(type="recipe").order_by('-created_at')

    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
