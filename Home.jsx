// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import trueCareLogo from '../pages/TrueCare.jpeg'; // Adjust filename if needed

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
              background-color: #E6E6FA;
              color: #333;
              position: relative;
              overflow: hidden;
          }

          /* Privacy Policy button on the top left */
          .privacy-link {
              position: absolute;
              top: 20px;
              left: 20px;
              animation: slideInLeft 1s ease-in-out;
          }

          .privacy-link a {
              text-decoration: none;
              color: #4CAF50;
              display: flex;
              font-weight: bold;
              border: 2px solid #4CAF50;
              border-radius: 5px;
              padding: 5px 10px;
              background-color: white;
              transition: transform 0.3s ease, background-color 0.3s ease;
          }

          .privacy-link a:hover {
              transform: scale(1.1);
              background-color: #e7f6e7;
          }

          /* Login and Register buttons on the top right */
          .auth-links {
              position: absolute;
              top: 20px;
              right: 20px;
              display: flex;
              gap: 10px;
              animation: slideInRight 1s ease-in-out;
          }

          .button-box {
              border: 2px solid #4CAF50;
              padding: 5px;
              border-radius: 5px;
              background-color: white;
              transition: transform 0.3s ease, background-color 0.3s ease;
          }

          .button-link {
              text-decoration: none;
              color: #4CAF50;
              font-weight: bold;
              padding: 5px 10px;
          }

          .button-box:hover {
              transform: scale(1.1);
              background-color: #e7f6e7;
          }

          /* Logo animation */
          .logo {
              width: 150px;
              margin-bottom: 20px;
              animation: fadeInScale 1s ease-in-out;
          }

          /* Slide and fade animation for the welcome text */
          h1, h5 {
              animation: slideFadeIn 1s ease-out;
              animation-fill-mode: both;
          }

          h1 {
              animation-delay: 0.5s;
          }

          h5 {
              animation-delay: 1s;
          }

          /* Contact Info Centered Below Welcome Text */
          .contact-info {
              text-align: center;
              color: black;
              font-family: Arial, sans-serif;
              margin-top: 20px;
              animation: fadeIn 1s ease-in-out;
              animation-delay: 1.5s;
              animation-fill-mode: both;
          }

          .contact-info p {
              margin: 0;
              font-weight: bold;
          }

          /* Keyframes for animations */
          @keyframes fadeInScale {
              from {
                  opacity: 0;
                  transform: scale(0.8);
              }
              to {
                  opacity: 1;
                  transform: scale(1);
              }
          }

          @keyframes slideFadeIn {
              from {
                  opacity: 0;
                  transform: translateY(-20px);
              }
              to {
                  opacity: 1;
                  transform: translateY(0);
              }
          }

          @keyframes fadeIn {
              from {
                  opacity: 0;
              }
              to {
                  opacity: 1;
              }
          }

          /* Slide-in animations for buttons */
          @keyframes slideInLeft {
              from {
                  opacity: 0;
                  transform: translateX(-50px);
              }
              to {
                  opacity: 1;
                  transform: translateX(0);
              }
          }

          @keyframes slideInRight {
              from {
                  opacity: 0;
                  transform: translateX(50px);
              }
              to {
                  opacity: 1;
                  transform: translateX(0);
              }
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
          <Link to="/loginChoice" className="button-link">Login</Link>
        </div>
        <div className="button-box">
          <Link to="/registerChoice" className="button-link">Register</Link>
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
