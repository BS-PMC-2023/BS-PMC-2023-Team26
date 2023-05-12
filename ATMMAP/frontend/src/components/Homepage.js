import Navbar from './Navbar';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ResetPasswordForm from './ResetPasswordForm';

import LoginPage from "./Loginpage";
import SignUp from "./Signuppage";
import MapPage from "./MapPage";
import ExchangeRatePage from './ExchangeRatePage';
import AuthButton from './AuthButton';
import AccountDetails from './AccountDetails';
import StockHistory from './StockHistory';
import CurrencyValueGraph from './CurrencyValueGraph';
import ContactAdminForm from './ContactAdminForm';
import EditRequest from './EditRequest'
import ResetRequest from './ResetRequest';
import DeleteRequest from './DeleteRequest';
import '../styles/Homepage.css';



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
          <Route exact path="/account" Component={AccountDetails}/>
          <Route exact path="/StockHistory" Component={StockHistory}/>
          <Route exact path="/CurrencyGraph" Component={CurrencyValueGraph}/>
          <Route exact path="/ResetRequest" Component={ResetRequest}/>
          <Route exact path="/DeleteRequest" Component={DeleteRequest}/>
          <Route exact path="/reset_form/:uidb64/:token" Component={ResetPasswordForm} />
          <Route exact path="/ContactAdminForm" Component={ContactAdminForm} />
          <Route exact path="/EditRequest" Component={EditRequest} />
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
        <link rel="stylesheet" href="/styles/Homepage.css"></link>
        <Navbar />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <h1>Welcome to Professional Exchange</h1>
              <p>Connect with professionals in your industry</p>
              <AuthButton />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
