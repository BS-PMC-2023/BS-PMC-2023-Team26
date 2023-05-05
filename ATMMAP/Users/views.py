from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect, JsonResponse
from django.contrib.auth.models import User
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import EmailMessage
from django.urls import reverse

TEMPLATE_DIRS = (
    'ATMMAP/frontend'
)

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.email = form.cleaned_data.get('email')
            user.is_active = False
            user.save()
            token_generator = PasswordResetTokenGenerator()
            token = token_generator.make_token(user)
            confirmation_link = request.build_absolute_uri(reverse('confirm_email', args=[user.id, token]))
            email_subject = 'Confirm your email address'
            email_body = f'Please click the following link to confirm your email address: {confirmation_link}'
            email = EmailMessage(subject=email_subject, body=email_body, to=[user.email])
            email.send()

            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'errors': form.errors})
    else:
        form = UserCreationForm()
    return render(request, '/signup', {'form': form})

def confirm_email(request, user_id, token):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return render(request, 'email_confirmation_failed.html')

    token_generator = PasswordResetTokenGenerator()
    if not token_generator.check_token(user, token):
        return render(request, 'email_confirmation_failed.html')

    user.is_active = True
    user.save()

    return render(request, 'email_confirmation_success.html')

# Return a csrf token 
def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

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

@csrf_exempt
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