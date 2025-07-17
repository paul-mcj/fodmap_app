from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedSimpleRouter
from .views import BlogViewSet
from posts.views import PostViewSet

# Main router for blogs
router = DefaultRouter()
router.register(r'blogs', BlogViewSet, basename='blogs')

# Nested router for posts inside blogs
posts_router = NestedSimpleRouter(router, r'blogs', lookup='blog')
posts_router.register(r'posts', PostViewSet, basename='blog-posts')

urlpatterns = router.urls + posts_router.urls