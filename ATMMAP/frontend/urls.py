
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('signup/', views.index2),
    path('signin/', views.index2),
    path('map/', views.index),
    path('ResetRequest/', views.index),
    path('ExchangeRate/', views.index),
    path('StockHistory/', views.index),
    path('account/', views.index),
    path('DeleteRequest/', views.index),
    path('reset_form/<uidb64>/<token>/', views.index, name='reset_form')
]
