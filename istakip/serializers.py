from django.db.models import fields
from rest_framework import serializers

from istakip.models import *

class WorkersSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Workers
        fields=('id','workerName', 'workerTelNo')

class FruitsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Fruits
        fields=('id','fruiteName', 'fruiteKg')


class SuperUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SuperUser
        fields=('superUserId', 'superUserPassword')

class RecordSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Record
        fields=('worker', 'workerFruiteId','workerFruiteKg', 'workerPayment')

class RecordSerializerGet(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Record
        fields=('worker', 'workerFruiteId','workerFruiteKg', 'workerPayment', 'recordSaveTime')