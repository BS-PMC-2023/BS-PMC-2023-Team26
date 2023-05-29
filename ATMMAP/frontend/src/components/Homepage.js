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
import EditRequest from './EditRequest';
import PaymentPage from './PaymentPage';
import ResetRequest from './ResetRequest';
import DeleteRequest from './DeleteRequest';
import CryptoGraph from './CryptoGraph';
import SubscriptionCancellation from './SubscriptionCancellation';
import '../styles/Homepage.css';
import backgroundImage from '../styles/financial-stock-market-graph-rows-coins-growth-abstract-symbol-finance-concept-business-investment-currency-exchange-162020228.jpg';


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
          <Route exact path="/CryptoGraph" Component={CryptoGraph} />
          <Route exact path="/PaymentPage" Component={PaymentPage} />
          <Route exact path="/cancelSub" Component={SubscriptionCancellation} />
        </Routes>
      </BrowserRouter>
    );
  }
}

class Home extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="home-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Navbar />
        <div className="container h-100">
          <div className="row justify-content-center align-items-center" style={{ height: '50%' }}>
            <div className="col-md-6 text-center">
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.7)', 
                borderRadius: '15px', 
                padding: '20px',
                boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)',
                maxWidth: '70%',
                margin: '0 auto'
              }}>
                <AuthButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}
