from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from istakip.models import *
from istakip.serializers import *

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password,check_password


def index(request):
    workers = Workers.objects.all()
    workers_serializer = WorkersSerializer(workers, many = True)
    workersdict = []
    for item in workers_serializer.data:
        item = dict(item)
        workersdict.append(item)
    fruits = Fruits.objects.all()
    fruits_serializer = FruitsSerializer(fruits, many = True)
    fruitsdict = []
    for item in fruits_serializer.data:
        item = dict(item)
        fruitsdict.append(item)
    records = Record.objects.all()
    record_serializer = RecordSerializerGet(records, many= True)
    recordsdict = []
    recordsdatedict = []
    for item in record_serializer.data:
        item = dict(item)
        item['recordSaveTime'] = item['recordSaveTime'].split('T')[0].split('-')[2] + '.' + item['recordSaveTime'].split('T')[0].split('-')[1] + '.' + item['recordSaveTime'].split('T')[0].split('-')[0]
        recordsdict.append(item)
        if not item['recordSaveTime'] in recordsdatedict:
            recordsdatedict.append(item['recordSaveTime'])
    return render (request, 'istakip/homepage.html', {'title': 'Homepage',
                                                      'workers': workersdict,
                                                      'fruits': fruitsdict,
                                                      'records': recordsdict,
                                                      'recordsdate': recordsdatedict})
    # return HttpResponse("Hello, world. You're at the polls index.")

@csrf_exempt
def WorkerApi(request, id = 0):
    if request.method == 'GET':
        workers = Workers.objects.all()
        workers_serializer = WorkersSerializer(workers, many = True)
        return JsonResponse(workers_serializer.data, safe = False)
    elif request.method == 'POST':
        workers_data = JSONParser().parse(request)
        print(workers_data)
        # patient_data['patientPassword'] = make_password(patient_data['patientPassword'])
        # # print(check_password(patient_data['patientPassword']))
        worker_serializer = WorkersSerializer(data = workers_data)
        if worker_serializer.is_valid():
            worker_serializer.save()
            return JsonResponse(workers_data['workerName'] + " Başarıyla Eklendi", safe = False)
    elif request.method=='PUT':
        workers_data = JSONParser().parse(request)
        worker = Workers.objects.get(id = workers_data['id'])
        worker_serializer = WorkersSerializer(worker, data=workers_data)
        if worker_serializer.is_valid():
            worker_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        workers_data = JSONParser().parse(request)
        print(workers_data)
        worker=Workers.objects.get(id = workers_data['id'])
        worker.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def FruiteApi(request, id = 0):
    if request.method == 'GET':
        fruits = Fruits.objects.all()
        fruits_serializer = FruitsSerializer(fruits, many = True)
        return JsonResponse(fruits_serializer.data, safe = False)
    elif request.method == 'POST':
        fruite = None
        fruits_data = JSONParser().parse(request)
        fruits_data['fruiteName'] = fruits_data['fruiteName'].upper().lower().capitalize()
        try:
            fruite = Fruits.objects.get(fruiteName = fruits_data['fruiteName'])
        except:
            print(fruite)
        if fruite != None:
            return JsonResponse(fruits_data['fruiteName'] + " Zaten Mevcut", safe = False)
        else:
            fruits_serializer = FruitsSerializer(data = fruits_data)
            if fruits_serializer.is_valid():
                fruits_serializer.save()
                return JsonResponse(fruits_data['fruiteName'] + " Başarıyla Eklendi", safe = False)
    elif request.method=='PUT':
        fruite_data = JSONParser().parse(request)
        fruite = Fruits.objects.get(id = fruite_data['id'])
        fruite_serializer = FruitsSerializer(fruite, data=fruite_data)
        if fruite_serializer.is_valid():
            fruite_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        fruits_data = JSONParser().parse(request)
        print(fruits_data)
        fruite=Fruits.objects.get(id = fruits_data['id'])
        fruite.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def SuperUserApi(request, id = 0):
    if request.method == 'POST':
        superuser_data = JSONParser().parse(request)
        superuser_data['patientPassword'] = make_password(superuser_data['patientPassword'])
        # print(check_password(patient_data['patientPassword']))
        superuser_serializer = SuperUserSerializer(data = superuser_data)
        if superuser_serializer.is_valid():
            superuser_serializer.save()
            return JsonResponse("Added Successfully", safe = False)
        return JsonResponse("Failed to Add", safe = False)

@csrf_exempt
def RecordApi(request, id = 0):
    if request.method == 'POST':
        record_data = JSONParser().parse(request)
        for item in record_data['workers']:
            print(item)
            record_serializer = RecordSerializer(data = item)
            if record_serializer.is_valid():
                record_serializer.save()
            else:
                return JsonResponse("Failed to Add", safe = False)
            print(record_serializer.errors)
        
        return JsonResponse("Added Successfully", safe = False)

@csrf_exempt
def SignInApi(request, id = 0):
    if request.method == 'POST':
        try:
            signin_data = JSONParser().parse(request)
            signin = Admins.objects.filter(adminId = signin_data['adminId']).values() 
            if signin_data['adminPassword'] == signin[0]['adminPassword']:
                return JsonResponse("Giriş Başarılı", safe = False)

        except:
            return JsonResponse("Kullanıcı Adı veya Şifre Hatalı", safe = False)
        # if check_password(patient_data['patientPassword'], patient[0]['patientPassword']) == True:
        #     return JsonResponse("Giriş Başarılı", safe = False)

# def homepage(request):
#     return render (request, 'homepage/homepage.html', {'title': 'Homepage', 'posts': context})

# def contentpage(request, news_slug):
#     selectedNews = News.objects.get(slug = news_slug)

#     return render (request, 'homepage/contentpage.html',{
#         'title' : 'Content Of New',
#         'selectedNews': selectedNews,
#         })
