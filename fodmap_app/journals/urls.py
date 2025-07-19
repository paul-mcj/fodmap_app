from django.urls import path
from .views import JournalEntryListCreateView

urlpatterns = [
    path("", JournalEntryListCreateView.as_view(), name="journals-list-create"),
    path("<int:pk>/", JournalEntryListCreateView.as_view(), name="journal-detail"),
]

# TODO: /api/journals/         # GET all user journals, POST new
# /api/journals/<pk>/    # GET, PUT, DELETE specific journal