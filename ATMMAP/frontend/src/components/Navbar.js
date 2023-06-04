import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function MyNavBar() {
  const [darkMode, setDarkMode] = useState(false);
  const [vipActivated, setvipActivated] = useState(null);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }
  
  useEffect(() => {
    fetch('/Users/user_details/')
      .then(response => response.json())
      .then(data => {
        setvipActivated(data.activated);
      });
  }, []);

  return (
    <Navbar className="my-navbar" bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg">
      <div className="navbar-left"><Navbar.Brand className="font-yellow-big" as={Link} to="/">ATM MAP</Navbar.Brand></div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
        <Nav>
          <Nav.Link className="font-yellow" as={Link} to="/">Home</Nav.Link>
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
          <Button onClick={toggleDarkMode} variant="outline-primary">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavBar;
