from django.urls import path
from .views import FoodListAPIView

urlpatterns = [
    path('', FoodListAPIView.as_view(), name='food-list'),
]