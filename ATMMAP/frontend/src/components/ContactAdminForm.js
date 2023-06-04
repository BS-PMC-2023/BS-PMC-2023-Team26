import React, { useState, useEffect } from 'react';
import '../styles/ContactAdminForm.css';
import Navbar from './Navbar';
import { Navigate } from 'react-router-dom';

const ContactAdminForm = () => {
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

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
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('csrfmiddlewaretoken', csrfToken);

    fetch('/Users/contact_us/', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setIsSuccess(true);
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // handle error
      });
  };

  if (isSuccess) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="contact-admin-form">
        <h2 style={{ color: 'darkgoldenrod', fontWeight : 'bold', fontSize : '40px'}}>Contact Us</h2>
        <form onSubmit={handleSubmit}>
        <label htmlFor="email" style={{ color: 'darkgoldenrod', fontWeight : 'bold', fontSize : '20px'}}>Your Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required/>
            <label htmlFor="subject" style={{ color: 'darkgoldenrod', fontWeight : 'bold', fontSize : '20px'}}>Message Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            required
          />
            <label htmlFor="message" style={{ color: 'darkgoldenrod', fontWeight : 'bold', fontSize : '20px'}}>Message:</label>
            <textarea
              className="contact-admin-form__textarea"
              id="message"
              placeholder="Write your message to the admin here"
              value={message}
              onChange={(event) => setMessage(event.target.value)} 
              required
            />
            <div>
            <button className="contact-admin-form__submit" style={{ color: '#212529', backgroundColor: 'darkgoldenrod'}} type="submit">
              Send Message
            </button>
            </div>
        </form>
      </div>
    </>
  );
};

export default ContactAdminForm;
