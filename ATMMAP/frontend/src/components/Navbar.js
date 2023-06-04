import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function MyNavBar() {
  const [darkMode, setDarkMode] = useState(true);
  const [vipActivated, setvipActivated] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isStaff, setisStaff] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  useEffect(() => {
    fetch('/Users/user_details/')
      .then(response => response.json())
      .then(data => {
        setvipActivated(data.activated);
        setLoggedIn(data.loggedIn);
        setisStaff(data.isAdmin);
      });
  }, []);

  const handleSignOut = () => {
    fetch('Users/signout/', { method: 'POST' })
      .then(response => {
        if (response.ok) {
          setLoggedIn(false);
          navigate('/');
          window.location.reload();
        }
      });
  }
  const handleAdminClick = () => {
    if (isStaff) {
      navigate('/admin');
      window.location.reload();
    }
  }
  return (
    <Navbar className="my-navbar" bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg">
      <div className="navbar-left"><Navbar.Brand className="font-yellow-big" as={Link} to="/">ATM MAP</Navbar.Brand></div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
        <Nav>
          <Nav.Link className="font-yellow" as={Link} to="/map">Map</Nav.Link>
          <Nav.Link className="font-yellow" as={Link} to="/ExchangeRate">Exchange rate</Nav.Link>
          {vipActivated == "True" && (
          <Nav.Link className="font-yellow" as={Link} to="/StockHistory">Stock History</Nav.Link>)}
          {vipActivated == "True" && (
          <Nav.Link className="font-yellow" as={Link} to="/CurrencyGraph">Currency Graph</Nav.Link>)}
          {vipActivated == "True" && (
          <Nav.Link className="font-yellow" as={Link} to="/CryptoGraph">Crypto Graph</Nav.Link>)}
          <Nav.Link className="font-yellow" as={Link} to="/ContactAdminForm">Contact Us</Nav.Link>
        </Nav>
        <Nav className="navbar-right">
          <Dropdown >
              <Dropdown.Toggle className="font-yellow" variant="outline-light" id="dark-mode-dropdown">
                My Account
              </Dropdown.Toggle>
              <Dropdown.Menu className={`${darkMode ? 'bg-dark' : ''}`}>
              {loggedIn == true && (
                <Nav.Link style={{ color: 'darkgoldenrod'}} as={Link} to="/account">Account Details</Nav.Link>)}
              {isStaff == true && (
                <Nav.Link style={{ color: 'darkgoldenrod'}} onClick={handleAdminClick}>Admin Page</Nav.Link>)}
              {loggedIn == true && (
                <Nav.Link style={{ color: 'darkgoldenrod'}} onClick={handleSignOut}>Sign Out</Nav.Link>)}
              {loggedIn == false && (
                <Nav.Link style={{ color: 'darkgoldenrod'}} as={Link} to="/signin">Sign In</Nav.Link>)}
              </Dropdown.Menu>
            </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavBar;
