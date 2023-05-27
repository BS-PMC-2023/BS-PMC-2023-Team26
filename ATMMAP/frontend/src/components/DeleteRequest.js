import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/DeleteRequest.css';
import Navbar from './Navbar';

const DeleteRequest = () => {
  const [Password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    fetch('/Users/get-csrf-token/') // Update to your endpoint
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

    const formData = new FormData();
    formData.append('Password', Password);
    formData.append('csrfmiddlewaretoken', csrfToken);

    fetch('/Users/delete_user/', { // Update to your endpoint
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
      <div className="delete-container">
        <div className="delete-request-container">
          <form className="delete-request-form" onSubmit={handleDelete}>
            <h2>Delete Your Account</h2>
            <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
            <label className="delete-request-label">
              Enter your Password:
              <input className="delete-request-input" type="text" value={Password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button className="delete-request-button" type="submit">Delete Account</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeleteRequest;
