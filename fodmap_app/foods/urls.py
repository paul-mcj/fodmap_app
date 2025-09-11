from rest_framework.routers import DefaultRouter
from .views import FoodViewSet, UserFoodRatingViewSet

router = DefaultRouter()
router.register(r'', FoodViewSet, basename='foods')
router.register(r'user-ratings', UserFoodRatingViewSet, basename='user-food-ratings')

urlpatterns = router.urls


# GET /foods/ → list of all canonical foods.

# GET /user-ratings/ → list of current user’s ratings.

# POST /user-ratings/ → create a rating tied to the logged-in user.

# PUT/PATCH /user-ratings/<id>/ → update their own rating.

# DELETE /user-ratings/<id>/ → delete their rating.