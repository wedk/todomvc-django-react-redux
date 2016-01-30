# api_urls.py
from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register(r'projects', views.ProjectViewSet)
router.register(r'projects/(?P<project_id>[0-9]+)/tasks', views.TaskViewSet, 'Task')
urlpatterns = router.urls