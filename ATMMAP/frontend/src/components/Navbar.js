import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function MyNavBar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
    <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg">
      <Navbar.Brand as={Link} to="/">ATM MAP</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
        <Nav>
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/map">Map</Nav.Link>
          <Nav.Link as={Link} to="/ExchangeRate">Exchange rate</Nav.Link>
          <Nav.Link as={Link} to="/StockHistory">Stock History</Nav.Link>
          <Nav.Link as={Link} to="/CurrencyGraph">Currency Graph</Nav.Link>
          <Nav.Link as={Link} to="/ContactAdminForm">Contact Us</Nav.Link>
          <Nav.Link as={Link} to="/CryptoGraph">Crypto Graph</Nav.Link>
        </Nav>
        <Nav>
          <Button onClick={toggleDarkMode} variant="outline-primary">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavBar;
