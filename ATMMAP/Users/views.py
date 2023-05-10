from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login, logout, get_user_model
from .models import CustomUserCreationForm
from django.http import Http404, HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.urls import reverse
from django.contrib import messages
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from .models import CustomUser, Profile
TEMPLATE_DIRS = (
    'ATMMAP/frontend'
)

def signin(request):
    if request.method == 'POST':
        model = get_user_model()
        username = request.POST.get('username')
        password = request.POST.get('password')
        try:
            user = model.objects.get(username=username)
        except model.DoesNotExist:  # <-- use CustomUser here
            return JsonResponse({'success': False, 'message': 'Invalid username or password.'})
        if user.is_active and user.check_password(password):
            login(request, user)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'message': 'Incorrect password.'})

# Return a csrf token 
def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})


def signup(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST, request.FILES)  
        if form.is_valid():
            # Save user data
            user = form.save(commit=False)
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user.set_password(raw_password)
            user.save()
            # Get the profile picture from the form's cleaned data
            profile_picture = form.cleaned_data.get('profile_picture')
            if profile_picture:
                profile, _ = Profile.objects.get_or_create(user=user)
                profile.profile_picture = profile_picture
                profile.save()
            # Generate verification token and save it to the user's profile
            token_generator = default_token_generator
            token = token_generator.make_token(user)
            user.verification_token = token
            user.save()
            # Construct verification link
            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
            verification_url = request.build_absolute_uri(reverse('verify', args=[uidb64, token]))
            # Send verification email
            send_mail(
                'Verify your MySite account',
                f'Please click the following link to verify your account: {verification_url}',
                'markos5623@gmail.com',
                [user.email],
                fail_silently=False,
            )
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'errors': form.errors})
    else:
        form = CustomUserCreationForm()
    return render(request, 'signup.html', {'form': form})

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
        'profile_picture': user.profile.profile_picture.url if hasattr(user, 'profile') and user.profile.profile_picture else None,
    }
    return JsonResponse(user_data)

def verify(request, uidb64, token):
    usermodel = get_user_model()
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = usermodel.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.email_confirmed = True
        user.save()
        messages.success(request, 'Your email has been confirmed. Thank you for registering.')
        return redirect('/')
    else:
        raise Http404('Email confirmation link is invalid or has expired.')
    
@csrf_exempt 
def reset_form(request, uidb64, token):
    if request.method == 'POST':
        usermodel = get_user_model()
        print(uidb64)
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = usermodel.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
            return JsonResponse({'success': False, 'message': 'User not found.'})
        
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')
        if password1 != password2:
            return JsonResponse({'success': False, 'message': 'Passwords do not match!'})
        user.set_password(password1)
        user.save()
        logout(request)
        return JsonResponse({'success': True})
    else:
        return render(request, 'frontend/index.html')

@csrf_exempt  
def call_reset(request):
    if request.method == 'POST':
        model = get_user_model()
        username = request.POST.get('username')
        try:
            user = model.objects.get(username=username)
        except model.DoesNotExist:  # <-- use CustomUser here
            return JsonResponse({'success': False, 'message': 'User not found!.'})
        token_generator = default_token_generator
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        print(uidb64)
        token = token_generator.make_token(user)
        password_url = request.build_absolute_uri(reverse('reset_form', args=[uidb64, token]))
        send_mail(
            'Reset your ATMMAP password',
            f'Please click the following link to reset your password: {password_url}',
            'markos5623@gmail.com',
            [user.email],
            fail_silently=False,)
    return JsonResponse({'success': True})

@csrf_exempt 
def delete_user(request):
    if request.method == 'POST':
        model = get_user_model()
        username = request.user.username
        try:
            user = model.objects.get(username=username)
        except model.DoesNotExist:  # <-- use CustomUser here
            return JsonResponse({'success': False, 'message': 'User not found!.'})
        
        password1 = request.POST.get('password1')
        if user.check_password(password1):
            logout(request)
            user.delete()
            return JsonResponse({'success': True})
    else:
        return render(request, 'frontend/index.html')
    
@csrf_exempt 
def edit_user(request):
    if request.method == 'POST':
        usermodel = get_user_model()
        try:
            user = usermodel.objects.get(username=request.user.username)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
            return JsonResponse({'success': False, 'message': 'User not found.'})
        username1 = request.POST.get('username1')
        username2 = request.POST.get('username2')
        if username1 != username2:
            return JsonResponse({'success': False, 'message': 'Usernames do not match!'})
        user.username = username1
        user.save()
        return JsonResponse({'success': True})
    else:
        return render(request, 'frontend/index.html')