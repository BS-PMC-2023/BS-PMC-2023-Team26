import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/ResetPasswordForm.css';

function cancelSub() {
  const [subscriptionId, setSubscriptionId] = useState('');
  const [result, setResult] = useState('');
  const clientId = 'AalNXBXcyO6rC2inzR9zjvkLx9Xhi7ASy6EUY6rysIgsCLQmFDVz4Je_Rm6gCoGalQ8QbOOTXP7boKT8'; // Replace with your actual client ID
  const secret = 'EE9970wYo0H2UgIPmXWl2Sq7XViL-VJJ3h10hiuqli1ps31VLxBqO5O7GGuInnUD3tu05y-aVW6he0mN'; // Replace with your actual secret
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/Users/payment_id/')
      .then(response => response.json())
      .then(data => {
        setSubscriptionId(data.subscriptionId);
      });
  }, []);

  const handleCancel = () => {
    const url = `https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionId}/cancel`;
    const authString = `${clientId}:${secret}`;
    const encodedAuthString = btoa(authString);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Basic ${encodedAuthString}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          fetch('Users/VIP_Cancel/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          setResult('Subscription cancellation successful.');
          navigate('/');
        } else {
          setResult('Subscription cancellation failed.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setResult('An error occurred. Please try again.');
      });
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-form-container">
        <Link to='/account'>
          <button className="account-details-button">Go back</button>
        </Link>
        <p>You are about to cancel your VIP subcription for ATMMAP</p>
        <p>You are about to lose these benefits:
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
        <button className="account-details-button" onClick={handleCancel}>End Subscription</button>
        {result && <p>{result}</p>}
      </div>
    </div>
  );
}

export default cancelSub;
