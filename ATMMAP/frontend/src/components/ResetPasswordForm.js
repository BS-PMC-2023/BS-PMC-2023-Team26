import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

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
    formData.append('password1', password);
    formData.append('password2', password2);
    formData.append('csrfmiddlewaretoken', csrfToken);

    fetch('/Users/reset_form/', {
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
    navigate('/', { replace: true });
  }

  return (
    <div id="reset-password-form">
      <form onSubmit={handleReset}>
        <h2>Reset your password</h2>
        <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Confirm Password:
          <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
        </label>
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
