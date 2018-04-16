from django.db import models

# Create your models here.
class UserInfo(models.Model):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20)

class HistoricalData(models.Model):
	organization = models.CharField(max_length=20)
	date = models.DateField(auto_now_add=False)
	open = models.FloatField(default=0)
	close = models.FloatField(default=0)
	high = models.FloatField(default=0)
	low = models.FloatField(default=0)
	volume = models.IntegerField(default=0)

class RealTimeData(models.Model):
	organization = models.CharField(max_length=20)
	Date = models.DateField(auto_now_add=False)
	Time = models.DateTimeField(auto_now_add=True)
	open = models.FloatField(default=0)
	close = models.FloatField(default=0)
	high = models.FloatField(default=0)
	low = models.FloatField(default=0)
	volume = models.IntegerField(default=0)
