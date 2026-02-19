from django.urls import path
from .views import create_report
from .views import get_reports
from .views import vol_register



urlpatterns = [
    path("reports/create/", create_report),
    path("reports/",get_reports),
    path("vol_register/",vol_register),
]
