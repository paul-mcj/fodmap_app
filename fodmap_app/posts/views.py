from .models import RecipePost, DiscussionPost
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
from .serializers import RecipePostSerializer, DiscussionPostSerializer, PostSerializer
from blogs.models import Blog

# GET all posts
class BlogPostsAPIView(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        blog_id = self.kwargs.get('blog_id')
        return (RecipePost.objects.filter(blog_id=blog_id) |
                DiscussionPost.objects.filter(blog_id=blog_id)).order_by('-updated_at')

# GET posts for currently authenticated logged in user
class UserPostsAPIView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return (RecipePost.objects.filter(author=user) |
                DiscussionPost.objects.filter(author=user)).order_by('-updated_at')

# Allow authors to edit/delete their posts, others can only read.
class IsAuthorOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user

class RecipePostViewSet(viewsets.ModelViewSet):
    queryset = RecipePost.objects.all()
    serializer_class = RecipePostSerializer
    permission_classes = [IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class RecipePostDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return RecipePost.objects.filter(author=self.request.user)

class DiscussionPostViewSet(viewsets.ModelViewSet):
    queryset = DiscussionPost.objects.all()
    serializer_class = DiscussionPostSerializer
    permission_classes = [IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class DiscussionPostDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return DiscussionPost.objects.filter(author=self.request.user)
