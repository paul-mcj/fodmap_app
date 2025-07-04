from rest_framework import serializers
from .models import JournalEntry

class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = ['id', 'body', 'created_at']
        read_only_fields = ['id', 'created_at']