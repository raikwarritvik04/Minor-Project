// src/pages/Help.jsx
import React from 'react';

const Help = () => {
  return (
    <div className="help-container">
      <style>
        {`
          .help-container {
              background-color: #f9f9f9;
              color: #333;
              font-family: Arial, sans-serif;
              padding: 2rem;
              max-width: 600px;
              margin: 4rem auto;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
          
          .help-container h2 {
              color: #4CAF50;
              margin-bottom: 1rem;
          }
          
          .help-container p {
              font-size: 1rem;
              margin-bottom: 1rem;
          }
          
          .help-container ol {
              padding-left: 1.5rem;
          }
          
          .help-container li {
              margin-bottom: 0.5rem;
          }
        `}
      </style>

      <h2>Password Recovery Help</h2>
      <p>If you've forgotten your password, follow these steps to recover it:</p>
      <ol>
        <li>Click on the "Forgot Password?" link on the login page.</li>
        <li>Enter your registered email address.</li>
        <li>Check your email for a password reset link.</li>
        <li>Click the link and follow the instructions to set a new password.</li>
      </ol>
      <p>If you don't receive the email within a few minutes, please check your spam folder or contact support.</p>
    </div>
  );
};

export default Help;
