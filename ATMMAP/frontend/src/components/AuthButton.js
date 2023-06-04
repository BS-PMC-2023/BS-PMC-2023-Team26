import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';

class AuthButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: null,
    };
  }

  fetchUserDetails = () => {
    fetch('Users/user_details/')
      .then(response => response.json())
      .then(data => {
        this.setState({
          username: data.username,
        });
      });
  }

  componentDidMount() {
    fetch('/Users/check_login/')
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoggedIn: data.isLoggedIn
        });
        if (data.isLoggedIn) {
          this.fetchUserDetails();
        }
      });
  }

  handleSignOut = () => {
    fetch('Users/signout/', { method: 'POST' })
      .then(response => {
        if (response.ok) {
          this.setState({
            isLoggedIn: false,
            username: null,
          });
          return <Navigate to="/" />; 
        }
      });
  }

  render() {
    const { isLoggedIn, username } = this.state;
    if (isLoggedIn) {
      return (
        <div>
          <h2 style={{ textAlign: 'center', fontSize: '30px' }}>
            Welcome, {username}!
          </h2>
          <button className="btn btn-primary btn-lg" onClick={this.handleSignOut}>Sign Out</button>
          <Link to="/account">
            <button className="btn btn-primary btn-lg">Account Details</button>
          </Link>
        </div>
      );
      
    } else {
      return (
        <div>
            <Link to="/signin">
                <button className="btn btn-primary btn-lg">Sign In</button>
            </Link>
            <Link to="/signup">
                <button className="btn btn-primary btn-lg">Sign Up</button>
            </Link>
        </div>
      );
    }
  }
}

export default AuthButton;
