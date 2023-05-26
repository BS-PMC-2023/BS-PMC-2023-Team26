import React, { useEffect } from 'react';

const PaymentPage = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AX4kf35YJeoUfZYFDsXZp9QrzyJDgdJDRNaIv490uk-t6srW5884CGU7WXDMmhFgYkifMfWkqFGk3UNp&vault=true&intent=subscription';
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
        },
        createSubscription: function(data, actions) {
          return actions.subscription.create({
            /* Creates the subscription */
            plan_id: 'P-9W952749MP466283WMRYM4FQ'
          });
        },
        onApprove: function(data, actions) {
          alert('You have successfully registered for VIP services');
          // You can add optional success message for the subscriber here
        }
      }).render('#paypal-button-container-P-9W952749MP466283WMRYM4FQ'); // Renders the PayPal button
    };

    return () => {
      // Clean up the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return <div id="paypal-button-container-P-9W952749MP466283WMRYM4FQ"></div>;
};

export default PaymentPage;
