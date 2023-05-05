import Navbar from './Navbar';
import React, { Component } from 'react';
import '../styles/Homepage.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import LoginPage from "./Loginpage";
import SignUp from "./Signuppage";
import MapPage from "./MapPage";
import ExchangeRatePage from './ExchangeRatePage';
import AuthButton from './AuthButton';

export default class Homepage extends Component {
constructor(props){
  super(props);
}
render(){
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Home}/>
        <Route exact path="/signup" Component={SignUp}/>
        <Route exact path="/signin" Component={LoginPage}/>
        <Route exact path="/map" Component={MapPage}/>
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
            <AuthButton />
            <Link to="/ExchangeRate">
            <button className="btn btn-primary btn-lg">Exchange rate</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
