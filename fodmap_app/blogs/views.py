from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response

from .models import Blog
from .serializers import BlogSerializer
from .permissions import IsAuthorOrReadOnly

class BaseBlogViewSet(viewsets.ModelViewSet):
    """Shared behavior for all blog-like viewsets."""

    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def my(self, request):
        queryset = self.get_queryset().filter(author=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class BlogViewSet(BaseBlogViewSet):
    queryset = Blog.objects.all().order_by("-created_at")


class DiscussionViewSet(BaseBlogViewSet):
    queryset = Blog.objects.filter(type="discussion").order_by("-created_at")


class RecipeViewSet(BaseBlogViewSet):
    queryset = Blog.objects.filter(type="recipe").order_by("-created_at")
