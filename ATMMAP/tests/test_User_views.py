from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.core import mail
from Users.models import CustomUserCreationForm
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.http import JsonResponse
from Users.models import VIP
import json
from django.core.mail import outbox
from django.views.decorators.csrf import csrf_exempt
from django.core.files.uploadedfile import SimpleUploadedFile



class MyViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpassword'
        )
        
        self.vip = VIP.objects.create(user=self.user, paymentID='abc123',activated=True)
        self.token = default_token_generator.make_token(self.user)
        self.uidb64 = urlsafe_base64_encode(force_bytes(self.user.pk))
        


    def test_signin_view_success(self):
        url = reverse('signin')
        response = self.client.post(url, {'username': 'testuser', 'password': 'testpassword'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'success': True})

    
   # def test_signin_view_invalid_credentials(self):
    #    url = reverse('signin')
    #    response = self.client.post(url, {'username': 'nonexistentuser', 'password': 'wrongpassword'})
    #    self.assertEqual(response.status_code, 200)
    #    self.assertEqual(response.json(), {'success': False, 'message': 'Invalid username or password.'})


    def test_get_csrf_token_view(self):
        url = reverse('csrf_token')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIn('csrfToken', response.json())


    def test_signup_view_success(self):
        url = reverse('signup')
        response = self.client.post(url, {'username': 'newuser','email': 'test@example.com', 'password1': 'newpassword123', 'password2': 'newpassword123'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'success': True})
        self.assertEqual(len(mail.outbox), 1)  # Verify that an email was sent


   # def test_signup_view_invalid_form(self):
   #     url = reverse('signup')
   #     response = self.client.post(url, {'username': 'newuser','email': 'test@example.com' ,'password1': 'newpassword', 'password2': 'differentpassword'})
   #     self.assertEqual(response.status_code, 200)
   #     self.assertEqual(response.json(), {'success': False})


    def test_signout_view(self):
        url = reverse('signout')
        response = self.client.post(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'success': True})


    def test_check_login_view(self):
        url = reverse('check_login')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIn('isLoggedIn', response.json())


    def test_payment_id_view(self):
        self.client.force_login(self.user)
        url = reverse('payment_id')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers['Content-Type'], 'application/json')
        expected_data = {'subscriptionId': 'abc123'}
        response_data = response.json()
        self.assertEqual(response_data, expected_data)

    def test_check_vip_view(self):
        self.client.force_login(self.user)
        url = reverse('check_vip')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers['Content-Type'], 'application/json')
        expected_data = {'vipActivated': True}
        response_data = response.json()
        self.assertEqual(response_data, expected_data)


    def test_user_details_view(self):
        self.client.login(username='testuser', password='Testpassword')
        url = reverse('user_details')  # Assuming 'user_details' is the URL name for the user details view
        response = self.client.get(url)
        self.assertEqual(response.status_code, 302) 


    def test_verify_view(self):
        response = self.client.get(reverse('verify', args=[self.uidb64, self.token]))
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, '/')




    def test_call_reset_view(self):
        response = self.client.post(reverse('call_reset'), {'username': 'testuser'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'success': True})

        # Check if an email was sent
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject, 'Reset your ATMMAP password')
        self.assertEqual(mail.outbox[0].to, ['test@example.com'])
    

    def test_contact_us_admin_not_found(self):
        response = self.client.post(reverse('contact_us'))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers['Content-Type'], 'application/json')

        json_data = json.loads(response.content)
        self.assertEqual(json_data['success'], False)
        self.assertEqual(json_data['message'], 'Admin not found!.')


    