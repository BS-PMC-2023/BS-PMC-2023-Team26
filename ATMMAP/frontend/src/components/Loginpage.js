import React from 'react';
import '../styles/Loginpage.css';

const Loginpage = () => {
  return (
    <div className="login-container">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary">Log in</button>
      </form>
    </div>
  );
};

export default Loginpage;
