import Navbar from './Navbar';
import React from 'react';
import '../styles/Homepage.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

const Homepage = () => {
  return (
    <Router>
    <div className="home-page">
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h1>Welcome to Professional Exchange</h1>
            <p>Connect with professionals in your industry</p>
            <button className="btn btn-primary btn-lg">Log In</button>
            <button className="btn btn-secondary btn-lg">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    </Router>
  );
};

export default Homepage;

