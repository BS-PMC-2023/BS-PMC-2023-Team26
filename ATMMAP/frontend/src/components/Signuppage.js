import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/Signuppage.css';
import Navbar from './Navbar';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); // Added profile picture state
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

  const handleSignUp = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password1', password);
    formData.append('password2', password2);
    formData.append('profile_picture', profilePicture); // Append profile picture to form data
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
        // handle error
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
        </label>
        <label className="signup-label">
          Email:
          <input className="signup-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="signup-label">
          Password:
          <input className="signup-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label className="signup-label">
          Confirm Password:
          <input className="signup-input" type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
        </label>
        <label className="signup-label">
          Profile Picture:
          <input className="signup-input" type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])} />
        </label>
        <button className="signup-button" type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignUp;
