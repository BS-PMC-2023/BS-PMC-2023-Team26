
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('signup/', views.index2),
    path('signin/', views.index2),
    path('map/', views.index),
]
