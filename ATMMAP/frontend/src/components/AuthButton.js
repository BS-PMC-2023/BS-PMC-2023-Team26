import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

class AuthButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {
    axios.get('/Users/check_login/')
      .then(response => {
        this.setState({
          isLoggedIn: response.data.isLoggedIn
        });
      });
  }

  handleSignOut = () => {
    axios.post('/Users/signout/')
      .then(response => {
        this.setState({
          isLoggedIn: false
        });
        return <Navigate to="/" />; 
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
        <Link to="/signin">
            <button className="btn btn-primary btn-lg">Sign In</button>
        </Link>
      );
    }
  }
}

export default AuthButton;
