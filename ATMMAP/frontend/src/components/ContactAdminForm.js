import React, { useState } from 'react';
import '../styles/ContactAdminForm.css';
import Navbar from './Navbar';

const ContactAdminForm = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here
    // For example, you can send the message to the admin via an API call
    console.log('Message to admin:', message);
    setMessage('');
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <>
    <Navbar/>
    <div className="contact-admin-form">
      <h2>Contact Admin</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="contact-admin-form__textarea"
          placeholder="Write your message to the admin here"
          value={message}
          onChange={handleChange}
          required
        />
        <button className="contact-admin-form__submit" type="submit">
          Send Message
        </button>
      </form>
    </div>
    </>
  );
};

export default ContactAdminForm;
