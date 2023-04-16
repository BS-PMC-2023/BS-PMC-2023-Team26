import Navbar from './Navbar';
import React, { Component } from 'react';
import '../styles/Homepage.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import Signuppage from "./Signuppage";
import ExchangeRatePage from './ExchangeRatePage';


export default class Homepage extends Component {
constructor(props){
  super(props);
}
render(){
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Home}/>
        <Route exact path="/signup" Component={Signuppage}/>
        <Route exact path="/login" Component={LoginPage}/>
        <Route exact path="/ExchangeRate" Component={ExchangeRatePage}/>
      </Routes>
    </BrowserRouter>
  );
}
}

class Home extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="home-page">
      <Navbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h1>Welcome to Professional Exchange</h1>
            <p>Connect with professionals in your industry</p>
            <Link to="/login">
            <button className="btn btn-primary btn-lg">Log In</button>
            </Link>
            <Link to="/signup">
            <button className="btn btn-secondary btn-lg">Sign Up</button>
            </Link>
            <Link to="/ExchangeRate">
            <button className="btn btn-secondary btn-lg">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    );
  }
  }
