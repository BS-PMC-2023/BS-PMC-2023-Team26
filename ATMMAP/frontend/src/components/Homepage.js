import Navbar from './Navbar';
import React, { Component } from 'react';
import '../styles/Homepage.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import Signuppage from "./Signuppage";



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
            <button className="btn btn-primary btn-lg">Log In</button>

          </div>
        </div>
      </div>
    </div>
    );
  }
  }
