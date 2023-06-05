import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function MyNavBar() {
  const [vipActivated, setvipActivated] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isStaff, setisStaff] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

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
          <Nav.Link
            className={`font-yellow ${location.pathname === '/map' ? 'active' : ''}`}
            as={Link}
            to="/map"
          >
            Map
          </Nav.Link>
          <Nav.Link
            className={`font-yellow ${location.pathname === '/ExchangeRate' ? 'active' : ''}`}
            as={Link}
            to="/ExchangeRate"
          >
            Exchange rate
          </Nav.Link>
          {vipActivated === "True" && (
            <Nav.Link
              className={`font-yellow ${location.pathname === '/StockHistory' ? 'active' : ''}`}
              as={Link}
              to="/StockHistory"
            >
              Stock History
            </Nav.Link>
          )}
          {vipActivated === "True" && (
            <Nav.Link
              className={`font-yellow ${location.pathname === '/CurrencyGraph' ? 'active' : ''}`}
              as={Link}
              to="/CurrencyGraph"
            >
              Currency Graph
            </Nav.Link>
          )}
          {vipActivated === "True" && (
            <Nav.Link
              className={`font-yellow ${location.pathname === '/CryptoGraph' ? 'active' : ''}`}
              as={Link}
              to="/CryptoGraph"
            >
              Crypto Graph
            </Nav.Link>
          )}
          <Nav.Link
            className={`font-yellow ${location.pathname === '/ContactAdminForm' ? 'active' : ''}`}
            as={Link}
            to="/ContactAdminForm"
          >
            Contact Us
          </Nav.Link>
        </Nav>
        <Nav className="navbar-right">
          <Dropdown>
            {loggedIn && (
            <Dropdown.Toggle className="font-yellow" variant="outline-light" id="dark-mode-dropdown">
              My Account
            </Dropdown.Toggle>)}
            {!loggedIn && (
            <Dropdown.Toggle className="font-yellow" variant="outline-light" id="dark-mode-dropdown">
              Signup/Signin
            </Dropdown.Toggle>)}
            <Dropdown.Menu className={`${darkMode ? 'bg-dark' : ''}`}>
              {loggedIn && (
                <Nav.Link
                  style={{ color: 'darkgoldenrod' }}
                  as={Link}
                  to="/account"
                  className={`font-yellow ${location.pathname === '/account' ? 'active' : ''}`}
                >
                  Account Details
                </Nav.Link>
              )}
              {isStaff && (
                <Nav.Link
                  style={{ color: 'darkgoldenrod' }}
                  onClick={handleAdminClick}
                  className={`font-yellow ${location.pathname === '/admin' ? 'active' : ''}`}
                >
                  Admin Page
                </Nav.Link>
              )}
              {loggedIn && (
                <Nav.Link
                  style={{ color: 'darkgoldenrod' }}
                  onClick={handleSignOut}
                >
                  Sign Out
                </Nav.Link>
              )}
              {!loggedIn && (
                <Nav.Link
                  style={{ color: 'darkgoldenrod' }}
                  as={Link}
                  to="/signup"
                  className={`font-yellow ${location.pathname === '/signup' ? 'active' : ''}`}
                >
                  Sign Up
                </Nav.Link>
              )}
              {!loggedIn && (
                <Nav.Link
                  style={{ color: 'darkgoldenrod' }}
                  as={Link}
                  to="/signin"
                  className={`font-yellow ${location.pathname === '/signin' ? 'active' : ''}`}
                >
                  Sign In
                </Nav.Link>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavBar;
