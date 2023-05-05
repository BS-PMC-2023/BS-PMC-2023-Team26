from django.urls import path
from . import views

urlpatterns = [
    path('signin/', views.signin),
    path('signup/', views.signup),
    path('signout/', views.signout),
    path('get-csrf-token/', views.get_csrf_token),
    path('check_login/', views.check_login),
    path('user_details/', views.user_details),
]