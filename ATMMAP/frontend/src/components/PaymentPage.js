import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/ResetPasswordForm.css';

const PaymentPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AX4kf35YJeoUfZYFDsXZp9QrzyJDgdJDRNaIv490uk-t6srW5884CGU7WXDMmhFgYkifMfWkqFGk3UNp&vault=true&intent=subscription';
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
            const subscriptionId = data.subscriptionID;
            const planId = data.plan_id;
            fetch('Users/VIP_Res/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ subscriptionId, planId }),
            })
              .then(response => response.json())
              .then(data => {
                // Handle the response if needed
                console.log(data);
              })
              .catch(error => {
                // Handle any error that occurs during the request
                console.error(error);
              });
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

  return (<>
  <Navbar />
            <div className="reset-password-container">
              <div className="reset-password-form-container">
                <p style={{ color: 'darkgoldenrod', fontSize : '30px'}}>You are about to register for VIP services for ATMMAP</p>
                <p style={{ fontSize : '20px'}}>Your benefits as a VIP member will be:
                  <br/>
                  - Use advanced filter options for banks and ATMs
                  <br/>
                  - View crypto currency values live
                  <br/>
                  - View stock values live 
                  <br/>
                  - View currency values in graph 
                  <br/>
                  - Export stock, currency and crypto currency values to XL
                </p>
                <div id="paypal-button-container-P-9W952749MP466283WMRYM4FQ"></div>
                <Link to='/account'>
                  <button className="reset-password-button">Go back</button>
                </Link>
              </div>
            </div>
          </>);
};

export default PaymentPage;
