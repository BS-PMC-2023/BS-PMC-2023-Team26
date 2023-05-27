import React, { useState } from 'react';

function cancelSub() {
  const [subscriptionId, setSubscriptionId] = useState('');
  const [result, setResult] = useState('');
  const clientId = 'AalNXBXcyO6rC2inzR9zjvkLx9Xhi7ASy6EUY6rysIgsCLQmFDVz4Je_Rm6gCoGalQ8QbOOTXP7boKT8'; // Replace with your actual client ID
  const secret = 'EE9970wYo0H2UgIPmXWl2Sq7XViL-VJJ3h10hiuqli1ps31VLxBqO5O7GGuInnUD3tu05y-aVW6he0mN'; // Replace with your actual secret

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
          setResult('Subscription cancellation successful.');
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
      <label>
        Subscription ID:
        <input
          type="text"
          value={subscriptionId}
          onChange={(e) => setSubscriptionId(e.target.value)}
        />
      </label>
      <button onClick={handleCancel}>Cancel Subscription</button>
      {result && <p>{result}</p>}
    </div>
  );
}

export default cancelSub;
