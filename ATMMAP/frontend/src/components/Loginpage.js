import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import '../styles/Loginpage.css';
import Navbar from './Navbar';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState({}); // New state for input errors

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

  const validateForm = () => {
    const errors = {};

    if (!username) {
      errors.username = 'Username is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('csrfmiddlewaretoken', csrfToken);
  
      fetch('/Users/signin/', {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': csrfToken,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setLoggedIn(true);
            console.log(data);
          } else {
            setErrors({ serverError: data.error });
          }
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          setErrors({ serverError: 'Failed to login. Please try again.' });
        });
    }
  };
  
  

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />
      <section className="login-container">
        <div className="login-form">
          <h2 style={{ color: 'darkgoldenrod', fontWeight: 'bold', fontSize: '40px' }}>Sign in</h2>
          <form onSubmit={handleLogin}>
            <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
            <label className="login-label" style={{ color: 'darkgoldenrod' }}>
              Username:
              <input
                className="login-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </label>
            <label className="login-label" style={{ color: 'darkgoldenrod' }}>
              Password:
              <input
                className="login-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </label>
            {errors.serverError && <span className="error-message">{errors.serverError}</span>}
            <div className="button-container">
              <button
                className="login-button"
                style={{ color: '#212529', backgroundColor: 'darkgoldenrod', width: '100%' }}
                type="submit">
                Login
              </button>
            </div>
          </form>
          <Link to="/ResetRequest">
            <button
              className="login-button"
              style={{ width: 'auto', color: 'darkgoldenrod', backgroundColor: '#212529', width: '100%' }}>
              Reset Password
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
