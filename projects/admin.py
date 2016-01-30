from django.contrib import admin

from .models import Project, Task


class TaskInline(admin.TabularInline):
    model = Task
    extra = 3


class ProjectAdmin(admin.ModelAdmin):
    inlines = [TaskInline]


admin.site.register(Project, ProjectAdmin)