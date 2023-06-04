import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/SubscriptionCancellation.css';

function CancelSubscription() {
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
    <>
      <Navbar />
      <div className="cancel-subscription-container">
        <div className="cancel-subscription-content">
          <h2 className="cancel-subscription-heading">Cancel Your VIP Subscription</h2>
          <p className="cancel-subscription-text" style={{ color: 'darkgoldenrod'}}>
            Are you sure you want to cancel your VIP subscription for ATMMAP?
          </p>
          <div className="benefits-container">
            <h3 className="benefits-heading" style={{ color: 'darkgoldenrod'}}>Benefits of VIP Subscription:</h3>
            <ul className="benefits-list">
              <li>Use advanced filter options for banks and ATMs.</li>
              <li>View live cryptocurrency values.</li>
              <li>View live stock values.</li>
              <li>View currency values in a graph.</li>
              <li>Export stock, currency, and cryptocurrency values to Excel.</li>
            </ul>
          </div>
          <div className="button-container">
            <div className="cancel-button-wrapper">
              <button className="cancel-subscription-button" onClick={handleCancel}>
                Cancel Subscription
              </button>
              <Link to="/account" className="back-link">
                <button className="back-button">Go back</button>
              </Link>
            </div>
          </div>
          {result && <p className="result-message">{result}</p>}
        </div>
      </div>
    </>
  );
}

export default CancelSubscription;
