import React, { useState, useEffect } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import '../styles/DeleteRequest.css';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';

const DeleteRequest = () => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { uidb64, token } = useParams();
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

  const handleDelete = (e) => {
    e.preventDefault();
    const data = {};
    const formData = new FormData();
    formData.append('password1', password);
    formData.append('csrfmiddlewaretoken', csrfToken);

    fetch('/Users/delete_user/', {
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
        console.log(formData);
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

  const handleReturnHome = () => {
    navigate('/');
  };

  if (isSuccess) {
    return <Navigate to="/" />; 
  }

  return (
    <>
    <Navbar/>
      <h2>Are you sure you want to delete your account?</h2>
      <div className="delete-request-container">
        <form className="delete-request-form" onSubmit={handleDelete}>
          <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
          <label>
            Enter your password to confirm:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <div className="delete-request-buttons">
            <button type="submit" className="delete-request-btn">Confirm</button>
            <button type="button" onClick={handleReturnHome} className="delete-request-btn return-home-btn">Return Home</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DeleteRequest;
