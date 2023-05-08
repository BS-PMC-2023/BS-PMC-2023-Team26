import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/Homepage.css';



function AccountDetails() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch('/Users/user_details/')
      .then(response => response.json())
      .then(data => {
        setUser(data);
      });
  }, []);

  const handleDeleteUser = (e) => {
    return <Navigate to="/DeleteRequest" />; 
  }

  const handleResetPassword = (e) => {
    return <Navigate to="/ResetRequest" />; 
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h2>Account Details</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <div>
              <Link to='/ResetRequest'>
                <button className="button">Reset Password</button>
              </Link>
              <Link to='/DeleteRequest'>
                <button className="button">Delete User</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;
