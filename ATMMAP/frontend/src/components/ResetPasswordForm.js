import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/ResetPasswordForm.css';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { uidb64, token } = useParams();

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
    if (password !== password2) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    const formData = new FormData();
    formData.append('password1', password);
    formData.append('password2', password2);
    formData.append('csrfmiddlewaretoken', csrfToken);

    fetch('/Users/reset_form/'+ uidb64 +'/'+ token +'/', {
      method: 'POST',
      body: formData,
      headers: {
        'X-CSRFToken': csrfToken,
      },
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
    return <Navigate to="/" />; 
  }

  return (
    <>
      <Navbar/>
      <div className="reset-password-container">
        <div className="reset-password-form-container">
          <form className="reset-password-form" onSubmit={handleReset}>
            <h2 style={{ color: 'darkgoldenrod', fontWeight : 'bold', fontSize : '40px'}}>Reset Your Password</h2>
            <p>Please enter your new password below:</p>
            <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
            <label className="reset-password-label">
              New Password:
              <input className="reset-password-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <label className="reset-password-label">
              Confirm New Password:
              <input className="reset-password-input" type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
            </label>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className="reset-password-button" type="submit">Confirm New Password</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;
