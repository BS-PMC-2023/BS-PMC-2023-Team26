from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
TEMPLATE_DIRS = (
    'ATMMAP/frontend'
)

def login_user(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username = username, password = password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else: 
            messages.success(request, ("There was an error login in"))
            return redirect('login')
    return render(request, 'authenticate/login.html', {})

def register_user(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(username = username, password = password)
            login(request, user)
            messages.success(request, ("Registration succesful"))
            return redirect('home')
    else:
        form = UserCreationForm()

    return render(request, 'authenticate/register.html', { 'form' : form})
