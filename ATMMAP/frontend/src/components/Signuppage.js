import React, { useState, useEffect } from 'react';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    fetch('/Users/get-csrf-token/')
      .then(response => response.json())
      .then(data => {
        setCsrfToken(data.csrfToken);
      })
      .catch(error => {
        console.error('Failed to fetch CSRF token:', error);
      });
  }, []);

  const handleSignUp = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password1', password);
    formData.append('password2', password2);
    formData.append('csrfmiddlewaretoken', csrfToken);

    fetch('/Users/signup/', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // handle success response
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // handle error
      });
  }

  return (
    <form onSubmit={handleSignUp}>
      <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <label>
        Confirm Password:
        <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
      </label>
      <br />
      <button type="submit" to="/">Sign Up</button>
    </form>
  );
};

export default SignUp;
