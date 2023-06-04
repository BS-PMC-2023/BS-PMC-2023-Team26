import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/Signuppage.css';
import Navbar from './Navbar';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');

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

    const validationErrors = {};
    if (!username) {
      validationErrors.username = 'Username is required';
    }
    if (!email) {
      validationErrors.email = 'Email is required';
    }
    if (!password) {
      validationErrors.password = 'Password is required';
    }
    if (!password2) {
      validationErrors.password2 = 'Confirm your password is required';
    }
    if (password2 !== password) {
      validationErrors.matching = 'The passwords do not match';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password1', password);
    formData.append('password2', password2);
    formData.append('profile_picture', profilePicture);
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
        setError('Failed to sign up. Please try again.');
      });
  }

  if (isSuccess) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <form className="signup-form" onSubmit={handleSignUp}>
        <h2 style={{ color: 'darkgoldenrod', fontWeight : 'bold', fontSize : '40px'}}>Create an Account</h2>
        <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
        <label className="signup-label" style={{ color: 'darkgoldenrod'}}>
          Username:
          <input className="signup-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </label>
        <label className="signup-label" style={{ color: 'darkgoldenrod'}}>
          Email:
          <input className="signup-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </label>
        <label className="signup-label" style={{ color: 'darkgoldenrod'}}>
          Password:
          <input className="signup-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </label>
        <label className="signup-label" style={{ color: 'darkgoldenrod'}}>
          Confirm Password:
          <input className="signup-input" type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
          {errors.password2 && <span className="error-message">{errors.password2}</span>}
          {errors.matching && <span className="error-message">{errors.matching}</span>}
        </label>
        <label className="signup-label" style={{ color: 'darkgoldenrod'}}>
          Profile Picture:
          <input className="signup-input" type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])} />
        </label>
        {error && <span className="error-message">{error}</span>}
        <button className="signup-button" type="submit" style={{ color: '#212529', backgroundColor: 'darkgoldenrod'}}>Sign Up</button>
      </form>
    </>
  );
};

export default SignUp;
