import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterChoice = () => {
  const navigate = useNavigate();

  const handlePsychologistRegister = () => {
    navigate('/PsychologistRegister');
  };

  const handleUserRegister = () => {
    navigate('/userRegister');
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="page-container">
      <style>
        {`
          body {
            background-color: #E6E6FA;
            margin: 0;
            padding: 0;
            animation: fadeIn 1s ease-in-out;
          }

          .page-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            justify-content: center;
            margin-top: 0px;
            height: 100vh;
            box-sizing: border-box;
            animation: fadeIn 1s ease-in-out;
          }

          .button-container {
            display: flex;
            gap: 100px; /* Increased gap between boxes by 40px */
            justify-content: center;
            width: 90%;
            max-width: 800px;
            animation: slideUp 1s ease-out;
          }

          .box {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px 40px;
            background-color: white;
            border: 2px solid #4CAF50;
            border-radius: 10px;
            text-align: center;
            width: 300px; /* Decreased width by 10% */
            height: auto; /* Adjusted height */
            box-sizing: border-box;
            margin-bottom: 50px;
            opacity: 0;
            animation: fadeInUp 1s ease-out forwards;
          }

          .text {
            font-size: 18px;
            margin-bottom: 25px;
            font-weight: 500;
            color: #4CAF50;
          }

          .button {
            padding: 12px 25px;
            font-size: 16px;
            cursor: pointer;
            background-color: #4CAF50;
            color: #fff;
            border: none;
            border-radius: 5px;
            width: 100%;
            transition: transform 0.3s ease, background-color 0.3s ease;
          }

          .button:hover {
            transform: scale(1.05);
            background-color: #45a049;
          }

          .back-button {
            position: absolute;
            left: 20px;
            top: 20px;
            padding: 12px 20px;
            border: 2px solid #4CAF50;
            border-radius: 5px;
            background-color: F5F5F5;
            cursor: pointer;
            color: #4CAF50;
            font-weight: bold;
            font-size: 16px;
            transition: transform 0.3s ease, background-color 0.3s ease;
          }
        
          .back-button:hover {
            background-color: #4CAF50;
            color: white;
          }

          .back-button {
            left: 20px;
            animation: slideInLeft 0.8s ease-out;
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

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideUp {
            from {
              transform: translateY(50px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>

      <div>
        <button onClick={handleBackClick} className="back-button">
          Back
        </button>
      </div>
      <div className="button-container">
        <div className="box">
          <p className="text">Are you a User?</p>
          <button onClick={handleUserRegister} className="button">User-Register</button>
        </div>

        <div className="box">
          <p className="text">Are you a Psychologist?</p>
          <button onClick={handlePsychologistRegister} className="button">Psychologist-Register</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterChoice;
