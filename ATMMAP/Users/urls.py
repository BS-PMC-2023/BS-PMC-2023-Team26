from django.urls import path, include
from . import views

urlpatterns = [
    path('signin/', views.signin),
    path('signup/', views.signup),
    path('signout/', views.signout),
    path('get-csrf-token/', views.get_csrf_token),
    path('check_login/', views.check_login),
    path('user_details/', views.user_details),
    path('verify/<uidb64>/<token>/', views.verify, name='verify'),
    path('', include('allauth.urls')),
    path('call_reset/', views.call_reset),
    path('reset_form/<uidb64>/<token>/', views.reset_form, name='reset_form')
]