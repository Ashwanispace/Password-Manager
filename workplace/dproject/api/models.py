from django.db import models
from django.contrib.auth.models import User




class database(models.Model):
    id = models.UUIDField(primary_key=True)
    site = models.URLField()
    username = models.CharField(max_length=64)
    password = models.CharField(max_length=64)
    user = models.ForeignKey(User, on_delete=models.CASCADE)