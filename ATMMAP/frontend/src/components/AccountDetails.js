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
          <h2 style={{ color: 'darkgoldenrod', fontSize: '40px', textAlign : 'center' }}>Account Details</h2>
          <div className="profile-picture-container">
            {user.profile_picture && (
              <img
                src={user.profile_picture}
                alt="Profile Picture"
                className="profile-picture"
              />
            )}
          </div>
          <p style={{textAlign : 'center', fontSize: '20px'}}>
            <strong style={{ color: 'darkgoldenrod'}}>Username:</strong> {user.username}
          </p>
          <p style={{textAlign : 'center', fontSize: '20px'}}>
            <strong style={{ color: 'darkgoldenrod'}}>Email:</strong> {user.email}
          </p>
          <p style={{textAlign : 'center', fontSize: '20px'}}>
            <strong style={{ color: 'darkgoldenrod'}}>VIP subscriber:</strong> {user.activated}
          </p>
          <div className="account-details-buttons">
            <Link style={{ textDecoration: 'none' }} to="/ResetRequest">
              <button style={{ backgroundColor: 'darkgoldenrod', color: 'white' }} className="account-details-button">
                Reset Password
              </button>
            </Link>
            <Link style={{ textDecoration: 'none' }} to="/EditRequest">
              <button style={{ backgroundColor: 'darkgoldenrod', color: 'white' }} className="account-details-button">
                Edit Profile
              </button>
            </Link>
            {user.activated == 'False' && (
              <Link style={{ textDecoration: 'none' }} to="/PaymentPage">
                <button
                  style={{ backgroundColor: 'darkgoldenrod', color: 'white' }}
                  className="account-details-button"
                >
                  Become VIP
                </button>
              </Link>
            )}
            {user.activated == 'True' && (
              <Link style={{ textDecoration: 'none' }} to="/cancelSub">
                <button style={{ backgroundColor: 'silver', color: 'black' }} className="account-details-button">
                  Cancel VIP
                </button>
              </Link>
            )}
            <Link style={{ textDecoration: 'none' }} to="/DeleteRequest">
              <button style={{ backgroundColor: 'darkred', color: 'white' }} className="account-details-button">
                Delete User
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountDetails;
