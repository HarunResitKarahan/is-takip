from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('workers/getworkers', views.WorkerApi),
    path('fruite', views.FruiteApi),
    path('record', views.RecordApi),
    path('login', views.SignInApi)
    # path('<slug:news_slug>/', views.contentpage, name='contentpage'),
]