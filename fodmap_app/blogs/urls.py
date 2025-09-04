from rest_framework.routers import SimpleRouter
from rest_framework_nested.routers import NestedSimpleRouter
from .views import BlogViewSet, DiscussionViewSet, RecipeViewSet
from posts.views import PostViewSet

router = SimpleRouter()
router.register(r"blogs", BlogViewSet, basename="blogs")
router.register(r"discussions", DiscussionViewSet, basename="discussions")
router.register(r"recipes", RecipeViewSet, basename="recipes")

# Nest posts under blogs
posts_router = NestedSimpleRouter(router, r"blogs", lookup="blog")
posts_router.register(r"posts", PostViewSet, basename="blog-posts")

urlpatterns = router.urls + posts_router.urls
