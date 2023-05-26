from django.urls import path
from . import views

urlpatterns = [
    path("", views.index),
    path("signup/", views.index2, name="signup1"),
    path("signin/", views.index2, name="signin1"),
    path("map/", views.index, name="map"),
    path("ResetRequest/", views.index, name="ResetRequest"),
    path("ExchangeRate/", views.index, name="ExchangeRate"),
    path("StockHistory/", views.index, name="StockHistory"),
    path("account/", views.index, name="account"),
    path("DeleteRequest/", views.index, name="DeleteRequest"),
    path("EditRequest/", views.index),
    path("reset_form/<uidb64>/<token>/", views.index, name="reset_form"),
    path("CurrencyGraph/", views.index, name="CurrencyGraph"),
    path("CryptoGraph/", views.index, name="CryptoGraph"),
    path("ContactAdminForm/", views.index, name="ContactAdminForm"),
    path("PaymentPage/", views.index, name="PaymentPage"),
]
