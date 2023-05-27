from django.shortcuts import render

def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

def index2(request, *args, **kwargs):
    return render(request, 'frontend/signup.html')

def index3(request, *args, **kwargs):
    return render(request, 'frontend/payment.html')