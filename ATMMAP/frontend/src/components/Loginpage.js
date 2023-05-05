import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import Navbar from './Navbar';



function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

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

  const handleLogin = (e) => {
    e.preventDefault();

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
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          setLoggedIn(true); 
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  if (loggedIn) {
    return <Navigate to="/" />; 
  }

  return (
    
  <>
  <Navbar />
  <section className="login-container">
    <div className="login-form">
      <h2>Sign in</h2>
      <form onSubmit={handleLogin}>
        <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
        <label className="login-label">
          Username:
          <input className="login-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label className="login-label">
          Password:
          <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  </section>
</>



  );
}

export default LoginPage;
