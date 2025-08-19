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


# #  TODO: 
# /api/blogs/                # All blogs
# /api/blogs/<blog_id>/posts/   # Posts under a specific blog
# /api/blogs/<blog_id>/posts/<post_id>/   # Specific post


# Endpoint	Method(s)	Description
# /api/blogs/<blog_id>/posts/	GET, POST	List or create posts under a specific blog
# /api/blogs/<blog_id>/posts/<post_id>/	GET, PUT, DELETE	Retrieve/update/delete a specific post
# /api/posts/user/	GET	List posts authored by the current user

# No flat /api/posts/recipes/ or /api/posts/discussions/ anymore. Your frontend now consumes:

#     For all posts under a blog → /api/blogs/<blog_id>/posts/

#     For user’s authored posts → /api/posts/user/