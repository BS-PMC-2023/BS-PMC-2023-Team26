
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('API/', include('API.urls')),
    path('Users/', include('django.contrib.auth.urls')),
    path('Users/', include('Users.urls')),
    path('', include('frontend.urls')),
    path('admin/', admin.site.urls),
]
