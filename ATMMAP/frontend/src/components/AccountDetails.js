import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/AccountDetails.css';

function AccountDetails() {
  const [user, setUser] = useState(null);
  const [vipActivated, setvipActivated] = useState(null);

  useEffect(() => {
    fetch('/Users/user_details/')
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setvipActivated(data.activated);
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
          <p><strong>VIP subscriber:</strong> {user.activated}</p>
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
            {user.activated == "False" && (
              <Link to='/PaymentPage'>
                <button className="account-details-button">Become VIP</button>
              </Link>
            )}
            {user.activated == "True" && (
              <Link to='/cancelSub'>
                <button className="account-details-button">Cancel VIP</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountDetails;
