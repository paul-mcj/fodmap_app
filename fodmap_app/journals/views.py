from .models import JournalEntry
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import JournalSerializer

class JournalEntryListCreateView(generics.ListCreateAPIView):
    serializer_class = JournalSerializer
    permission_classes = [IsAuthenticated]

    # GET journal entries for authenticated logged in user
    def get_queryset(self):
        return JournalEntry.objects.filter(user=self.request.user).order_by('-created_at')
    
    # POST new journal entry for authenticated user
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)