from django.urls import path
from . import views

urlpatterns = [
    path('signin/', views.signin),
    path('signup/', views.signup),
    path('get-csrf-token/', views.get_csrf_token),
]