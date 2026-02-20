from django.urls import path
from .views import create_report
from .views import get_reports
from .views import vol_register
from .views import vol_login
from .views import volunteer_dashboard
from .views import org_login
from .views import org_register


urlpatterns = [
    path("reports/create/", create_report),
    path("reports/",get_reports),
    path("vol_register/",vol_register),
    path("vol_login/", vol_login),
    path("volunteer_dashboard/",volunteer_dashboard),   
    path("org_register/", org_register),
    path("org_login/", org_login),

]
