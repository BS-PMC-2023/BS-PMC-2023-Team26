from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    is_verified = models.BooleanField(default=False)
    verification_token = models.CharField(max_length=100, blank=True, null=True)
    groups = models.ManyToManyField(
        'auth.Group',
        blank=True,
        related_name='custom_users',
        verbose_name='groups',
    )

    def is_authenticated(self):
        return True if self.is_authenticated else False
    
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        blank=True,
        related_name='custom_users',
        verbose_name='user permissions',
    )

class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)
    profile_picture = forms.ImageField(required=False)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = UserCreationForm.Meta.fields + ('email', 'profile_picture')

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    # Add other profile fields as needed

    def __str__(self):
        return self.user.username

#class VIP(models.Model):
 #   user = models.OneToOneField(User, on_delete=models.CASCADE)
  #  activated = models.BooleanField(default=False)
   # paymentID = models.CharField(max_length=100, blank=True, null=True)
    # Add other profile fields as needed
    #def __str__(self):
     #   return self.user.username