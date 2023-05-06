import json
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from .models import CustomUserCreationForm
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail

TEMPLATE_DIRS = (
    'ATMMAP/frontend'
)

def signin(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None: 
            login(request, user)
            return JsonResponse({'success': True})
        else:
            try:
                user = User.objects.get(username=username)
                return JsonResponse({'success': False, 'message': 'Incorrect password.'})
            except User.DoesNotExist:
                return JsonResponse({'success': False, 'message': 'Invalid username or password.'})

# Return a csrf token 
def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})


def signup(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            # Save user data
            user = form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)

            # Configure email backend for sending emails
            send_mail(
                'Welcome to MySite',
                'Thank you for signing up!',
                'markos5623@gmail.com',
                [user.email],
                fail_silently=False,
            )

            login(request, user)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'errors': form.errors})
    else:
        form = CustomUserCreationForm()
    return render(request, '/signup', {'form': form})

# Sign out function
@csrf_exempt
def signout(request):
    if request.method == 'POST':
        logout(request) # sends a logout request
        return JsonResponse({'success': True}) # returns json confirmed logout
    return render(request, '/') # redirects user to homepage

# Checks if a user is logged in or not
@csrf_exempt
def check_login(request): 
    is_authenticated = request.user.is_authenticated
    return JsonResponse({'isLoggedIn': is_authenticated})

# Checks if a user is logged in or not
@login_required
def user_details(request):
    user = request.user
    user_data = {
        'username': user.username,
        'email': user.email,
    }
    return JsonResponse(user_data)
