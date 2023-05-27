import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://www.sandbox.paypal.com/webapps/billing/plans/subscribe?plan_id=P-9W952749MP466283WMRYM4FQ';
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      paypal
        .Buttons({
          style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'subscribe',
          },
          createSubscription: function (data, actions) {
            return actions.subscription.create({
              /* Creates the subscription */
              plan_id: 'P-9W952749MP466283WMRYM4FQ',
            });
          },
          onApprove: function (data, actions) {
            // Redirect to the homepage after a successful transaction
            navigate('/');
            alert('You have successfully registered for VIP services');
          },
        })
        .render('#paypal-button-container-P-9W952749MP466283WMRYM4FQ'); // Renders the PayPal button
    };

    return () => {
      // Clean up the script when the component unmounts
      document.body.removeChild(script);
    };
  }, [navigate]);

  return <div id="paypal-button-container-P-9W952749MP466283WMRYM4FQ"></div>;
};

export default PaymentPage;
