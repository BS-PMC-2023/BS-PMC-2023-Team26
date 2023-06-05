from django.test import SimpleTestCase

from django.urls import reverse , resolve,include
from Users.views import VIP_Cancel,check_vip,payment_id,VIP_Res,reset_form,edit_user,contact_us, signin ,signup , signout , get_csrf_token ,check_login , user_details ,verify ,call_reset, delete_user

class TestUrls(SimpleTestCase):

    def test_signin_url_is_resolved(self):
        url =reverse('signin')
        self.assertEqual(resolve(url).func,signin)
    
    def test_signup_url_is_resolved(self):
        url =reverse('signup')
        self.assertEqual(resolve(url).func,signup)
    
    def test_signout_url_is_resolved(self):
        url =reverse('signout')
        self.assertEqual(resolve(url).func,signout)
    
    def test_csrf_token_url_is_resolved(self):
        url =reverse('csrf_token')
        self.assertEqual(resolve(url).func,get_csrf_token)

    def test_check_login_url_is_resolved(self):
        url =reverse('check_login')
        self.assertEqual(resolve(url).func,check_login)
    
    def test_user_details_url_is_resolved(self):
        url =reverse('user_details')
        self.assertEqual(resolve(url).func,user_details)
    
    def test_verify_url_is_resolved(self):
        url =reverse('verify',args=['uidb64','token'])
        self.assertEqual(resolve(url).func,verify)
    
    def test_call_reset_url_is_resolved(self):
        url =reverse('call_reset')
        self.assertEqual(resolve(url).func,call_reset)
    
    def test_delete_user_url_is_resolved(self):
        url =reverse('delete_user')
        self.assertEqual(resolve(url).func,delete_user)

    def test_edit_user_user_url_is_resolved(self):
        url =reverse('edit_user')
        self.assertEqual(resolve(url).func,edit_user)

    def test_contact_us_user_url_is_resolved(self):
        url =reverse('contact_us')
        self.assertEqual(resolve(url).func,contact_us)

    def test_VIP_Res_url_is_resolved(self):
        url =reverse('VIP_Res')
        self.assertEqual(resolve(url).func,VIP_Res)

    def test_payment_id_url_is_resolved(self):
        url =reverse('payment_id')
        self.assertEqual(resolve(url).func,payment_id)

    def test_check_vip_url_is_resolved(self):
        url =reverse('check_vip')
        self.assertEqual(resolve(url).func,check_vip)

    def test_VIP_Cancel_url_is_resolved(self):
        url =reverse('VIP_Cancel')
        self.assertEqual(resolve(url).func,VIP_Cancel)

    