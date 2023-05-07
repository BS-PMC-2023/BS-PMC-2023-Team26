import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    <div>
      <h2>Account Details</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <Link to='/ResetRequest'>
        <button className="button">Reset Password</button>
      </Link>
    </div>
  );
}

export default AccountDetails;
