from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from .models import Food, UserFoodRating
from .serializers import FoodSerializer, UserFoodRatingSerializer

class FoodViewSet(viewsets.ModelViewSet):
    """
    Public GET (list/retrieve) for all users.
    Authenticated users can POST/PUT/PATCH/DELETE.
    """
    queryset = Food.objects.all().order_by('name')
    serializer_class = FoodSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['get'])
    def search(self, request):
        q = request.query_params.get('q', '').lower()
        if q:
            foods = Food.objects.filter(name__icontains=q).order_by('name')
        else:
            foods = Food.objects.none()
        serializer = self.get_serializer(foods, many=True)
        return Response(serializer.data)

class UserFoodRatingViewSet(viewsets.ModelViewSet):
    serializer_class = UserFoodRatingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserFoodRating.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)