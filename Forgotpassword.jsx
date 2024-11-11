// ForgotPassword.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/login'); // Adjust the path if your login page route is different
  };

  return (
    <div className="page-wrapper">
      <button onClick={handleBackClick} className="back-button">
        Back
      </button>
      <div className="container">
        <h2 className="heading">Forgot Password?</h2>
        <form className="form">
          <div className="input-box">
            <input
              type="email"
              id="email"
              placeholder="    Enter your Email address"
              className="input"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Send Reset Link
          </button>
        </form>
      </div>

      <style>
        {`
          .page-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            position: relative;
            background-color: #E6E6FA;
          }
          .container {
            width: 100%;
            max-width: 400px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            background-color: white;
            border: 2px solid #4CAF50;
          }
          .back-button {
              position: absolute;
              left: 20px;
              top: 20px;
              padding: 12px 20px;
              border: 2px solid #4CAF50;
              border-radius: 5px;
              background-color: white;
              cursor: pointer;
              color: #4CAF50;
              font-weight: bold;
              font-size:16px;
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
          .heading {
            font-size: 22px;
            margin-bottom: 20px;
            color: #333;
          }
          .form {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .input-box {
            width: 70%;
            padding: 0px;
            border: 2px solid #4CAF50;
            border-radius: 5px;
            margin-bottom: 15px;
          }
          .input {
            width: 80%;
            padding: 10px;
            border: none;
            outline: none;
            font-size: 16px;
            background-color: white;
          }
          .submit-button {
            width: 50%;
            padding: 5px;
            color: #fff;
            background-color: #4CAF50;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          }
            /* Keyframes for entrance animations */
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
        `}
      </style>
    </div>
  );
};

export default ForgotPassword;
