from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_user),
    path('signup/', views.signup),
    path('get-csrf-token/', views.get_csrf_token),
]