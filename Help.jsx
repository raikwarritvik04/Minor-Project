// src/pages/Help.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Help = () => {
  const navigate = useNavigate(); // Hook to navigate between pages

  return (
    <div>
      <style>
        {`
          body {
              background-color: #E6E6FA;
          }

          .help-container {
              color: #333;
              font-family: Arial, sans-serif;
              padding: 2rem;
              max-width: 600px;
              margin: 4rem auto;
              border-radius: 10px;
              border: 2px solid #4CAF50;
              background-color: #F5F5F5;
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
          
          .back-button {
              position: absolute;
              left: 20px;
              top: 20px;
              padding: 10px 20px;
              border: 2px solid #4CAF50;
              border-radius: 5px;
              background-color: white;
              cursor: pointer;
              color: #4CAF50;
              font-weight: bold;
              transition: transform 0.3s ease, background-color 0.3s ease;
          }
        
          /* Entrance animation for back and help buttons */
            .back-button {
                left: 20px;
                animation: slideInLeft 0.8s ease-out;
            }

          .back-button:hover {
              background-color: #4CAF50;
              color: white;
          }

          /* Keyframes for entrance animations */
          @keyframes slideInLeft {
              from {
                  opacity: 0;
                  transform: translateX(-50px);
              }
        `}
      </style>
      
      {/* Back button */}
      <div className="back-button" onClick={() => navigate('/')}>Back</div>

      <div className="help-container">
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
    </div>
  );
};

export default Help;
