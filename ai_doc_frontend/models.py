from django.db import models
from django.utils import timezone

# Create your models here.


class Department(models.Model):
    department = models.CharField(max_length=30)
    created_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(null=True, blank=True)
