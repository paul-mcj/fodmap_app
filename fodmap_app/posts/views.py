from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, BasePermission, SAFE_METHODS, IsAuthenticated
from rest_framework.generics import ListAPIView
from django.shortcuts import get_object_or_404
from .models import RecipePost, DiscussionPost
from blogs.models import Blog
from .serializers import PostSerializer

class AllPostsAPIView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return (RecipePost.objects.all() | DiscussionPost.objects.all()).order_by("-created_at")


class IsAuthorOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user

# handles posts depending on blog type (recipe or discussion)
class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def get_queryset(self):
        blog_id = self.kwargs["blog_pk"]
        return (RecipePost.objects.filter(blog_id=blog_id) |
                DiscussionPost.objects.filter(blog_id=blog_id)).order_by("-created_at")

    def perform_create(self, serializer):
        blog = get_object_or_404(Blog, pk=self.kwargs["blog_pk"])
        if blog.type == "recipe":
            RecipePost.objects.create(
                blog=blog, author=self.request.user, **serializer.validated_data
            )
        else:
            DiscussionPost.objects.create(
                blog=blog, author=self.request.user, **serializer.validated_data
            )

class UserPostsAPIView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return (RecipePost.objects.filter(author=user) |
                DiscussionPost.objects.filter(author=user)).order_by("-updated_at")
