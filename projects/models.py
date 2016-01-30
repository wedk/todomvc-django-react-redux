from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def remaining_tasks_count(self):
        return self.task_set.active().count()

    def completed_tasks_count(self):
        return self.task_set.completed().count()

    def __str__(self):
        return self.name


class TaskQuerySet(models.QuerySet):

    def active(self):
        return self.filter(completed=False)

    def completed(self):
        return self.filter(completed=True)


class Task(models.Model):
    title      = models.CharField(max_length=200)
    completed  = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    project    = models.ForeignKey(Project)

    objects = TaskQuerySet.as_manager()

    def __str__(self):
        return self.title