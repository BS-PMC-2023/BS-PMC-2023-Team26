import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/Signuppage.css';
import Navbar from './Navbar';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});

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

  const handleSignUp = (e) => {
    e.preventDefault();
    const errors = {};
    if (!username.trim()) errors.username = 'Username is required';
    if (!email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
    if (!password.trim()) errors.password = 'Password is required';
    if (!password2.trim()) errors.password2 = 'Please confirm your password';
    else if (password !== password2) errors.password2 = 'Passwords do not match';
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
    
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password1', password);
    formData.append('password2', password2);
    formData.append('csrfmiddlewaretoken', csrfToken);

    fetch('/Users/signup/', {
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
        setErrorMessage('Failed to sign up. Please try again later.');
      });
  }

  if (isSuccess) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <form className="signup-form" onSubmit={handleSignUp}>
        <h2>Create an Account</h2>
        <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
        <label className="signup-label">
          Username:
          <input className="signup-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          {errors.username && <span className="signup-error">{errors.username}</span>}
        </label>
          <label className="signup-label">
            Email:
              <input className="signup-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <span className="signup-error">{errors.email}</span>}
          </label>
          <label className="signup-label">
            Password:
              <input className="signup-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {errors.password && <span className="signup-error">{errors.password}</span>}
          </label>
          <label className="signup-label">
            Confirm Password:
              <input className="signup-input" type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
              {errors.password2 && <span className="signup-error">{errors.password2}</span>}
          </label>
          {errorMessage && <p className="signup-error">{errorMessage}</p>}
          <button className="signup-button" type="submit">Sign Up</button>
      </form>
    </>
    );
  };
          
export default SignUp;