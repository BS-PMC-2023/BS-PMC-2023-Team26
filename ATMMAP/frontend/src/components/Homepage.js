import Navbar from './Navbar';
import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ResetPasswordForm from './ResetPasswordForm';
import LoginPage from "./Loginpage";
import SignUp from "./Signuppage";
import MapPage from "./MapPage";
import ExchangeRatePage from './ExchangeRatePage';
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
          <Route exact path="/admin"/>
        </Routes>
      </BrowserRouter>
    );
  }
}

function Home() {
  const [vipActivated, setvipActivated] = useState('False');
  useEffect(() => {
    fetch('/Users/user_details/')
      .then(response => response.json())
      .then(data => {
        if(data)
          setvipActivated(data.activated);
      });
  }, []);
  return (
   <>
     <Navbar />
     <div className="container">
       <div className="row justify-content-center align-items-center">
         <div className="col-md-6 text-center">
           <div className="container-info">
             <h2 style={{ color: 'darkgoldenrod', fontSize: '50px', fontWeight: 'bold' }}>
               Welcome to ATMMAP
             </h2>
             <p style={{ color: 'white', fontSize: '20px', textAlign: 'left' }}>
               SPMP group 26 personally welcomes you to our site. Have a wonder full time using it!
             </p>
             <h2 style={{ color: 'darkgoldenrod', fontSize: '25px', fontWeight: 'bold' }}>
                 What would you like to do today?
              </h2>
             <p style={{ color: 'white', fontSize: '20px', textAlign: 'left' }}>
               <Link style={{ textDecoration: 'none' }} to="/ExchangeRate">
                 - View currency exchange rates
                 <br />
               </Link>
               <Link style={{ textDecoration: 'none' }} to="/map">
                 - Find ATMs or banks in your area
                 <br />
               </Link>
               {vipActivated == 'True' && (
                 <>
                   <Link style={{ textDecoration: 'none' }} to="/ExchangeRate">
                     - Get current stock rates
                     <br />
                   </Link>
                   <Link style={{ textDecoration: 'none' }} to="/CryptoGraph">
                     - Watch current cryptocurrency rates
                     <br />
                   </Link>
                   <Link style={{ textDecoration: 'none' }} to="/StockHistory">
                     - Watch current stock rates
                     <br />
                   </Link>
                   <Link style={{ textDecoration: 'none' }} to="/CurrencyGraph">
                     - Watch current currency rates
                   </Link>
                 </>
               )}
             </p>
           </div>
         </div>
       </div>
     </div>
   </>
  );
}
  

