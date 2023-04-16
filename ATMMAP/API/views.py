from django.shortcuts import render
TEMPLATE_DIRS = (
    'ATMMAP/frontend'
)

def home(request):
    return render(request, 'home.html', {})
