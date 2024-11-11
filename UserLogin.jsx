import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import axiosInstance from '../api/axiosConfig';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Completely remove scrollbar by setting overflow to hidden
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Clean up on unmount
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      try {
        const response = await axiosInstance.post('/login', { username, password });
        localStorage.setItem('token', response.data.token);
        const userId = response.data.userId;
        localStorage.setItem('userId', userId);
        navigate('/questionnaire', { state: { userId } });
      } catch (error) {
        console.error("Login failed:", error);
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
        {`
          /* Remove scrollbar on the entire page */
          body, html {
              overflow: hidden;
          }

          .login-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              background-color: #E6E6FA;
              color: #333;
              position: relative;
          }

          .back-button, .help-button {
              position: absolute;
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

          .back-button {
              left: 20px;
              animation: slideInLeft 0.8s ease-out;
          }

          .help-button {
              right: 20px;
              animation: slideInRight 0.8s ease-out;
          }

          .back-button:hover, .help-button:hover {
              transform: scale(1.1);
              background-color: #e7f6e7;
          }

          .login-form {
              display: flex;
              flex-direction: column;
              gap: 15px;
              width: 300px;
              border: 2px solid #4CAF50;
              border-radius: 10px;
              padding: 20px;
              background-color: white;
          }

          .input-box {
              border: 2px solid #4CAF50;
              border-radius: 5px;
              padding: 10px;
          }

          .input-box input {
              border: none;
              outline: none;
              width: 90%;
              font-size: 16px;
              background-color: white;
          }

          .error-message {
              color: red;
              margin-top: 10px;
          }

          .forgot-password {
              margin-top: 5px;
          }

          .forgot-password a {
              font-size: 17px;
              font-weight: bold;
              text-decoration: none;
              transition: color 0.3s ease, border-bottom 0.3s ease;
          }

          .forgot-password a:hover {
              border-bottom: 2px solid #4CAF50;
          }

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

      <div className="back-button" onClick={() => navigate('/loginChoice')}>
        Back
      </div>

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
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
        </div>
        <div className="input-box">
          <input 
            type="password" 
            placeholder="Password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <Button text="Submit" />
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      <div className="forgot-password">
        <Link to="/Forgotpassword">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default UserLogin;
