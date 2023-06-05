from django.test import SimpleTestCase

from django.urls import reverse , resolve
from frontend.views import index,index2

class TestUrls(SimpleTestCase):

    def test_signup_url_is_resolved(self):
        url =reverse('signup1')
        self.assertEqual(resolve(url).func,index2)

    def test_signin_url_is_resolved(self):
        url =reverse('signin1')
        self.assertEqual(resolve(url).func,index2)
    
    def test_map_url_is_resolved(self):
        url =reverse('map')
        self.assertEqual(resolve(url).func,index)
    
    def test_ResetRequest_url_is_resolved(self):
        url =reverse('ResetRequest')
        self.assertEqual(resolve(url).func,index)
    
    def test_ExchangeRate_url_is_resolved(self):
        url =reverse('ExchangeRate')
        self.assertEqual(resolve(url).func,index)

    def test_StockHistory_url_is_resolved(self):
        url =reverse('StockHistory')
        self.assertEqual(resolve(url).func,index)  

    def test_account_url_is_resolved(self):
        url =reverse('account')
        self.assertEqual(resolve(url).func,index)  

    def test_DeleteRequest_url_is_resolved(self):
        url =reverse('DeleteRequest')
        self.assertEqual(resolve(url).func,index)

    def test_EditRequest_url_is_resolved(self):
        url =reverse('EditRequest')
        self.assertEqual(resolve(url).func,index)
    
    def test_reset_form_url_is_resolved(self):
        url =reverse('reset_form',args=['uidb64','token'])
        self.assertEqual(resolve(url).func,index)

    def test_map_url_is_resolved(self):
            url =reverse('CurrencyGraph')
            self.assertEqual(resolve(url).func,index)

    def test_CryptoGraph_url_is_resolved(self):
            url =reverse('CryptoGraph')
            self.assertEqual(resolve(url).func,index)

    def test_ContactAdminForm_url_is_resolved(self):
            url =reverse('ContactAdminForm')
            self.assertEqual(resolve(url).func,index)

    def test_PaymentPage_url_is_resolved(self):
            url =reverse('PaymentPage')
            self.assertEqual(resolve(url).func,index)

    def test_cancelSub_url_is_resolved(self):
            url =reverse('cancelSub')
            self.assertEqual(resolve(url).func,index)