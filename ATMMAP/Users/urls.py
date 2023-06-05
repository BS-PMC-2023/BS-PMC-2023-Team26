from django.urls import path, include
from . import views

urlpatterns = [
    path('signin/', views.signin,name='signin'),
    path('signup/', views.signup,name='signup'),
    path('signout/', views.signout,name='signout'),
    path('get-csrf-token/', views.get_csrf_token,name='csrf_token'),
    path('check_login/', views.check_login,name='check_login'),
    path('user_details/', views.user_details,name='user_details'),
    path('verify/<uidb64>/<token>/', views.verify, name='verify'),
    path('', include('allauth.urls'),name=''),
    path('call_reset/', views.call_reset,name='call_reset'),
    path('delete_user/', views.delete_user,name='delete_user'),
    path('edit_user/', views.edit_user,name='edit_user'),
    path('contact_us/', views.contact_us,name='contact_us'),
    path('reset_form/<uidb64>/<token>/', views.reset_form, name='reset_form'),
    path('paypal/', include("paypal.standard.ipn.urls"),name='paypal'),
    path('VIP_Res/', views.VIP_Res, name='VIP_Res'),
    path('payment_id/', views.payment_id, name='payment_id'),
    path('check_vip/', views.check_vip, name='check_vip'),
    path('VIP_Cancel/', views.VIP_Cancel, name='VIP_Cancel'),
]