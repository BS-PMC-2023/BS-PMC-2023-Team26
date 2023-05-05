import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';

class AuthButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {
    fetch('/Users/check_login/')
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoggedIn: data.isLoggedIn
        });
      });
  }

  handleSignOut = () => {
    fetch('/Users/signout/', { method: 'POST' })
      .then(response => {
        if (response.ok) {
          this.setState({
            isLoggedIn: false
          });
          return <Navigate to="/" />; 
        }
      });
  }

  render() {
    const { isLoggedIn } = this.state;
    if (isLoggedIn) {
      return (
        <button className="btn btn-primary btn-lg" onClick={this.handleSignOut}>Sign Out</button>
      );
    } else {
      return (
        <div className="col-md-6 text-center">
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
