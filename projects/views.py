# views.py
from django.views.decorators.http import require_http_methods
from django.shortcuts import render
from django.utils import timezone

from rest_framework import viewsets
from rest_framework.decorators import list_route
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer

from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        project_id = self.kwargs['project_id']
        return Task.objects.filter(project=project_id)

    def perform_create(self, serializer):
        serializer.save(project_id=self.kwargs['project_id'])

    @list_route(methods=['delete'])
    def clear_completed(self, request, project_id):
        query = self.get_queryset().completed()
        task_ids = list(query.values_list('pk', flat=True))
        query.delete()
        return Response({ 'ids': task_ids })

    @list_route(methods=['patch'])
    def toggle_all(self, request, project_id):
        completed = request.data.get('completed', False)
        query = self.get_queryset().filter(completed=not(completed))
        task_ids = list(query.values_list('pk', flat=True))
        query.update(completed=completed, updated_at=timezone.now())
        return Response({ 'ids': task_ids, 'completed': completed })


@require_http_methods(['GET'])
def index(request):
    queryset = Project.objects.all()
    serializer = ProjectSerializer(queryset, many=True)
    projects_initial_state = JSONRenderer().render(serializer.data)
    return render(request, 'projects/index.html', context={ 'projects_initial_state': projects_initial_state })
