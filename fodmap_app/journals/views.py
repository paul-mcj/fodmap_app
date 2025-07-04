from .models import JournalEntry
from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.views import APIView
from .serializers import JournalSerializer

class JournalEntryListCreateView(generics.ListCreateAPIView):
    serializer_class = JournalSerializer
    permission_classes = [permissions.IsAuthenticated]

    # GET journal entries for authenticated logged in user
    def get_queryset(self):
        return JournalEntry.objects.filter(user=self.request.user).order_by('-created_at')
    
    # POST new journal entry for authenticated user
    def perform_create(self, serializer):
        print("DEBUG: User is", self.request.user)
        print("DEBUG: Payload is", self.request.data)
        serializer.save(user=self.request.user)