// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import trueCareLogo from './TrueCare.jpeg'; // Adjust filename if needed

const Home = () => {
  return (
    <div className="home">
      <style>
        {`
          .home {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              background-color: #87CEEB; /* Slightly darker sky blue */
              color: #333;
              position: relative;
          }

          /* Privacy Policy button on the top left */
          .privacy-link {
              position: absolute;
              top: 20px;
              left: 20px;
          }

          .privacy-link a {
              text-decoration: none;
              color: #4CAF50;
              font-weight: bold;
              border: 2px solid #4CAF50;
              border-radius: 5px;
              padding: 5px 10px;
              background-color: white;
          }

          /* Login and Register buttons on the top right */
          .auth-links {
              position: absolute;
              top: 20px;
              right: 20px;
              display: flex;
              gap: 10px; /* Space between buttons */
          }

          .button-box {
              border: 2px solid #4CAF50;
              padding: 5px;
              border-radius: 5px;
              background-color: white;
          }

          .button-link {
              text-decoration: none;
              color: #4CAF50;
              font-weight: bold;
              padding: 5px 10px;
          }

          /* Contact Info Centered Below Welcome Text */
          .contact-info {
              text-align: center; /* Center the text */
              color: #261498;
              font-family: Arial, sans-serif;
              margin-top: 20px; /* Add space above the contact info */
          }

          .contact-info p {
              margin: 0;
              font-weight: bold;
          }

          .logo {
              width: 150px; /* Adjust as needed */
              margin-bottom: 20px;
          }
        `}
      </style>

      {/* Privacy Policy link on the top left */}
      <div className="privacy-link">
        <Link to="/privacy-policy">Privacy Policy</Link>
      </div>

      {/* Login and Register links on the top right */}
      <div className="auth-links">
        <div className="button-box">
          <Link to="/login" className="button-link">Login</Link>
        </div>
        <div className="button-box">
          <Link to="/register" className="button-link">Register</Link>
        </div>
      </div>

      {/* Displaying Logo */}
      <img src={trueCareLogo} alt="True Care Logo" className="logo" />

      <h1>"WELCOME TO TRUE CARE"</h1>
      <h5>YOUR HEALING JOURNEY STARTS HERE!</h5>

      {/* Contact Details Centered Below the Welcome Text */}
      <div className="contact-info">
        <p>Email: truecare@gmail.com</p>
        <p>Contact: +1-234-567-890</p>
      </div>
    </div>
  );
};

export default Home;
