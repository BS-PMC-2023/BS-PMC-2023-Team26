import React, { useState } from 'react';
import '../styles/ContactAdminForm.css';
import Navbar from './Navbar';

const ContactAdminForm = () => {
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Subject:', subject);
    console.log('Email:', email);
    console.log('Message to admin:', message);
    setSubject('');
    setEmail('');
    setMessage('');
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="contact-admin-form">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
        <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required/>
            <label htmlFor="subject">Message Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={handleSubjectChange}
            required
          />
            <label htmlFor="message">Message:</label>
            <textarea
              className="contact-admin-form__textarea"
              id="message"
              placeholder="Write your message to the admin here"
              value={message}
              onChange={handleMessageChange}
              required
            />
            <div>
            <button className="contact-admin-form__submit" type="submit">
              Send Message
            </button>
            </div>
        </form>
      </div>
    </>
  );
};

export default ContactAdminForm;
