from .models import JournalEntry
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import JournalSerializer

# GET journal entries for authenticated logged in user
class UserJournalEntriesAPIView(generics.ListAPIView):
    serializer_class = JournalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return JournalEntry.objects.filter(user=self.request.user).order_by('-created_at')
    
# POST new journal entry for authenticated user
class PostNewJournalEntry(APIView):
    serializer_class = JournalSerializer
    permission_classes = [IsAuthenticated]

    def post(self, req, *args, **kwargs):
        serializer = self.serializer_class(data=req.data)
        if serializer.is_valid():
            serializer.save(user=req.user)  # Automatically set the logged-in user as owner
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)