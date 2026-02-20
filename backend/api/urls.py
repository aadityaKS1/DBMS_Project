from django.urls import path
from .views import create_report
from .views import get_reports
from .views import vol_register
from .views import vol_login
from .views import volunteer_dashboard
from .views import org_login
from .views import org_register
from .views import create_recovery_task
from .views import org_dashboard_data
from .views import ongoing_damages
from .views import apply_task
from .views import task_applicants
from .views import assign_volunteer
from .views import volunteer_tasks
from .views import recommend_damages
from .views import update_task_status
from .views import delete_application
from .views import delete_report
from .views import update_report



urlpatterns = [
    path("reports/create/", create_report),
    path("reports/",get_reports),
    path("vol_register/",vol_register),
    path("vol_login/", vol_login),
    path("volunteer_dashboard/",volunteer_dashboard),   
    path("org_register/", org_register),
    path("org_login/", org_login),
    path("create_recovery_task/",create_recovery_task),
    path("org_dashboard/<int:org_id>/", org_dashboard_data),
    path("ongoing_damages/", ongoing_damages),
    path("apply_task/", apply_task),
    path("task_applicants/<int:report_id>/", task_applicants),
    path("assign_volunteer/", assign_volunteer),
    path("volunteer_tasks/", volunteer_tasks),
    path("recommend_damages/", recommend_damages),
    path("update_task_status/", update_task_status),
    path("delete_application/", delete_application),
    path("delete-report/", delete_report),
    path("update-report/", update_report),
]
