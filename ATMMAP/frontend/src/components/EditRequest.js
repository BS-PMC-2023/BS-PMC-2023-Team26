import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/EditRequest.css';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';

const EditRequest = () => {
  const [username, setUsername] = useState('');
  const [username2, setUsername2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
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

  const handleEdit = (e) => {
    e.preventDefault();
    if (username !== username2) {
      setErrorMessage('Usernames do not match!');
      return;
    }

    const formData = new FormData();
    formData.append('username1', username);
    formData.append('username2', username2);
    formData.append('csrfmiddlewaretoken', csrfToken);
    formData.append('profile_picture', profilePicture);
    fetch('/Users/edit_user/', {
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

  // ...

  return (
    <>
      <Navbar/>
      <div className="account-details-container">
      <h2 style={{ color: 'darkgoldenrod', fontWeight : 'bold', fontSize : '40px'}}>Edit your profile</h2>
        <div className="account-details-form-container">
        <p>Please enter your new information below:</p>
          <form className="account-details-form" onSubmit={handleEdit}>
            <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
            <div className="edit-request__form-group">
              <label className="edit-request__label">
                New Username:
                <input className="edit-request__input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </label>
            </div>
            <div className="edit-request__form-group">
              <label className="edit-request__label">
                Confirm New Username:
                <input className="edit-request__input" type="text" value={username2} onChange={(e) => setUsername2(e.target.value)} required />
              </label>
            </div>
            <div className="edit-request__form-group">
              <label className="edit-request__label">
                Profile Picture:
                <input className="edit-request__input" type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])}/>
              </label>
            </div>
            {errorMessage && <p className="edit-request__error-message">{errorMessage}</p>}
            <div className="edit-request__buttons">
              <button className="edit-request__button" type="submit">Confirm Edit</button>
              <Link to='/account'>
                <button className="edit-request__button edit-request__button--cancel">Cancel</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
  };
  

export default EditRequest;
