import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/ResetRequest.css';
import Navbar from './Navbar';

const ResetRequest = () => {
  const [username, setUsername] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    fetch('/Users/get-csrf-token/')
      .then(response => response.json())
      .then(data => {
        setCsrfToken(data.csrfToken);
      })
      .catch(error => {
        console.error('Failed to fetch CSRF token:', error);
      });
  }, []);

  const handleReset = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('csrfmiddlewaretoken', csrfToken);

    fetch('/Users/call_reset/', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setIsSuccess(true);
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // handle error
      });
  }

  if (isSuccess) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="reset-container">
        <div className="reset-request-container">
          <form className="reset-request-form" onSubmit={handleReset}>
            <h2 style={{ color: 'darkgoldenrod'}}>Reset Your Password</h2>
            <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
            <label className="reset-request-label">
              Enter your Username:
              <input className="reset-request-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <button className="reset-request-button" type="submit">Send Reset Link</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetRequest;


