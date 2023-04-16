
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('signup/', views.index),
    path('login/', views.index),
    path('map/', views.index),
]
