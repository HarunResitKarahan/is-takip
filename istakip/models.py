from django.db import models
from django.utils import timezone

# Create your models here.
class Workers(models.Model):
    # workerID = models.AutoField(primary_key=True)
    workerName = models.CharField(max_length=200, default='')
    workerTelNo = models.CharField(max_length=200, default='')

class Fruits(models.Model):
    fruiteName = models.CharField(max_length=200, default='')
    fruiteKg = models.CharField(max_length=200, default='')

class SuperUser(models.Model):
    superUserId = models.CharField(max_length=200, default='')
    superUserPassword = models.CharField(max_length=200, default='')

class Record(models.Model):
    worker = models.CharField(max_length=200, default='')
    workerFruiteId = models.CharField(max_length=200, default='')
    workerFruiteKg = models.CharField(max_length=200, default='')
    workerPayment = models.CharField(max_length=200, default='')
    recordSaveTime = models.DateTimeField(default=timezone.now)

class Admins(models.Model):
    adminId = models.CharField(max_length=200, default='')
    adminPassword = models.CharField(max_length=200, default='')