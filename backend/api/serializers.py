from rest_framework import serializers
from .models import DamageReport

class DamageReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = DamageReport
        fields = "__all__"
