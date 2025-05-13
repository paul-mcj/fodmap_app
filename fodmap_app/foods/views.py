from .models import Food
from rest_framework import generics
from .serializers import FoodSerializer

# GET food records
class FoodListAPIView(generics.ListCreateAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer