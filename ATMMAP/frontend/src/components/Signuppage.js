import React from 'react';
import '../styles/Signuppage.css';

const Signuppage = () => {
  return (
    <div className="signup-container">
      <form>
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="fullname" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirm-password" />
        </div>
        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>
    </div>
  );
};

export default Signuppage;
