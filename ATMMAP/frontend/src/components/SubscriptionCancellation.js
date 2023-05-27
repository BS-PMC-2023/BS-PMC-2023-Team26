import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Cancel Subscription</h1>
      <label>You are about to cancel your VIP subscription for ATM-MAP!</label>
      <button onClick={handleCancel}>End Subscription</button>
      <Link to='/'>
        <button className="account-details-button">Cancel</button>
      </Link>
      {result && <p>{result}</p>}
    </div>
  );
}

export default cancelSub;
