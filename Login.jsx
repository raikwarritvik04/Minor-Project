import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button'; // Import the Button component
import axiosInstance from '../api/axiosConfig'; // Import the Axios instance

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      try {
        const response = await axiosInstance.post('/login', { username, password });

        // Store JWT token in localStorage
        localStorage.setItem('token', response.data.token);

        // Fetch userId and convert it to string if necessary
        const userId = response.data.userId; // Assuming userId is already a string
        localStorage.setItem('userId', userId); // Store userId

        // Redirect to questionnaire page with userId in state
        navigate('/questionnaire', { state: { userId } });
      } catch (error) {
        console.error("Login failed:", error);
        
        // Handle specific error messages based on the response status
        if (error.response) {
          setErrorMessage(error.response.data.message || 'Invalid username or password');
        } else {
          setErrorMessage('An error occurred. Please try again later.');
        }
      }
    }
  };

  return (
    <div className="login-container">
      <style>
        {
          `
          .login-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh; /* Full height */
              background-color: #87CEEB; /* Matching the home page */
              color: #333;
              position: relative; /* Positioning for absolute elements */
          }

          /* Back button style */
          .back-button, .help-button {
              position: absolute; /* Positioning in the corners */
              top: 20px;
              padding: 10px 20px; /* Increased padding */
              border: 2px solid #4CAF50; /* Button border */
              border-radius: 5px; /* Rounded corners */
              background-color: white; /* Button background */
              text-align: center; /* Center text */
              cursor: pointer; /* Pointer cursor */
              color: #4CAF50; /* Button text color */
              font-weight: bold; /* Bold text */
          }

          .back-button {
              left: 20px; /* Position to the left */
          }

          .help-button {
              right: 20px; /* Position to the right */
          }

          .login-form {
              display: flex;
              flex-direction: column;
              gap: 15px; /* Space between fields */
              width: 300px; /* Width of the form */
              border: 2px solid #4CAF50; /* Box border color */
              border-radius: 5px;
              padding: 20px; /* Padding inside the box */
              background-color: white; /* Box background */
          }

          /* Increase the length of the input boxes */
          .input-box {
              border: 2px solid #4CAF50; /* Box border color */
              border-radius: 5px;
              padding: 10px;
          }

          .input-box input {
              border: none; /* Remove default border */
              outline: none; /* Remove outline on focus */
              width: 90%; /* Take full width */
              font-size: 16px; /* Font size */
              background-color: white;
          }

          .error-message {
              color: red; /* Error message color */
              margin-top: 10px; /* Space above the error message */
          }
          `
        }
      </style>

      {/* Back button on the top left corner */}
      <div className="back-button" onClick={() => navigate('/')}>
        Back
      </div>

      {/* Help button on the top right corner */}
      <div className="help-button" onClick={() => navigate('/help')}>
        Help
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-box">
          <input 
            type="text" 
            placeholder="Username" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} // Handle username change
            required 
          />
        </div>
        <div className="input-box">
          <input 
            type="password" 
            placeholder="Password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} // Handle password change
            required 
          />
        </div>
        <Button text="Submit" />
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
      <div className="forgot-password">
        <Link to="/help">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;
