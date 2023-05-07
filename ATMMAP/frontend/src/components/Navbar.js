import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function MyNavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand className="navbar-brand" as={Link} to="/">ATM MAP</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/map">Map</Nav.Link>
          <Nav.Link as={Link} to="/ExchangeRate">Exchange rate</Nav.Link>
          <Nav.Link as={Link} to="/StockHistory">Stock History</Nav.Link>
          <Nav.Link as={Link} to="/CurrencyGraph">Currency Graph</Nav.Link>
          <Nav.Link href="#account">Account Details</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavBar;
