from django.urls import path
from .views import UserJournalEntriesAPIView, PostNewJournalEntry

urlpatterns = [
    path('me/', UserJournalEntriesAPIView.as_view(), name='user-journals'),
    path('new/', PostNewJournalEntry.as_view(), name='new-journal'),
]
