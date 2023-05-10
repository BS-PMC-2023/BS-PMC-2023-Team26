import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/AccountDetails.css';

function AccountDetails() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch('/Users/user_details/')
      .then(response => response.json())
      .then(data => {
        setUser(data);
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="account-details-container">
        <div className="account-details-container-inner">
          <h2>Account Details</h2>
          {user.profile_picture && (
            <img
              src={user.profile_picture}
              alt="Profile Picture"
              className="profile-picture"
            />
          )}
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <div className="account-details-buttons">
            <Link to='/ResetRequest'>
              <button className="account-details-button">Reset Password</button>
            </Link>
            <Link to='/DeleteRequest'>
              <button className="account-details-button">Delete User</button>
            </Link>
            <Link to='/EditRequest'>
              <button className="account-details-button">Edit Profile</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountDetails;
