from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from .models import Food
from .serializers import FoodSerializer

class FoodViewSet(viewsets.ModelViewSet):
    """
    Public GET (list/retrieve) for all users.
    Authenticated users can POST/PUT/PATCH/DELETE.
    """
    queryset = Food.objects.all().order_by('name')
    serializer_class = FoodSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]