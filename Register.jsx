import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import axiosInstance from '../api/axiosConfig';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleRegisterClick = async (e) => {
    e.preventDefault();

    if (e.target.checkValidity()) {
      try {
        const response = await axiosInstance.post('/register', {
          username,
          password,
          phone,
          email,
          street,
          city,
          state,
          country,
        });

        console.log(response.data);
        setShowSuccessMessage(true);
      } catch (error) {
        console.error("Registration failed:", error);
        setErrorMessage('Registration failed. Please try again.');
      }
    } else {
      e.target.reportValidity();
    }
  };

  return (
    <div className="register">
      <style>
        {`
          .register {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #87CEEB;
            color: #333;
            position: relative;
          }

          h3 {
            color: black;
            margin-bottom: 1rem;
          }

          .register-box {
            display: flex;
            flex-direction: column;
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            width: 500px;
          }

          form {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }

          .form-section {
            display: flex;
            gap: 10px;
          }

          .form-field {
            flex: 1;
          }

          input {
            padding: 10px;
            border: 2px solid #4CAF50;
            border-radius: 5px;
            font-size: 16px;
            width: 90%;
          }

          .back-button, .login-button {
            position: absolute;
            top: 20px;
            width: 60px;
            padding: 10px 20px;
            border: 2px solid #4CAF50;
            border-radius: 5px;
            background-color: white;
            text-align: center;
            cursor: pointer;
            color: #4CAF50;
            font-weight: bold;
          }

          .back-button {
            left: 20px;
          }

          .login-button {
            right: 20px;
          }

          .register-button {
            width: 120px;
            margin-top: 1rem;
          }

          .error-message {
            color: red;
            margin-top: 10px;
          }

          /* Box above the registration box */
          .success-message-box {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #4CAF50;
            color: white;
            padding: 15px;
            border-radius: 5px;
            font-weight: bold;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            width: 80%;
            max-width: 500px;
            margin-bottom: 20px;
            text-align: center;
          }
        `}
      </style>

      <div className="back-button" onClick={() => navigate('/')}>Back</div>
      <div className="login-button" onClick={() => navigate('/login')}>Login</div>

      <h3>Not part of True Care? Register Now!</h3>

      {/* Success message box above the registration box */}
      {showSuccessMessage && (
        <div className="success-message-box">
          Registration Successful! You can now log in.
        </div>
      )}

      <div className="register-box">
        <form onSubmit={handleRegisterClick}>
          <div className="form-section">
            <div className="form-field">
              <input 
                type="text" 
                placeholder="Username" 
                required 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
            <div className="form-field">
              <input 
                type="password" 
                placeholder="Password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
          </div>
          <div className="form-section">
            <div className="form-field">
              <input 
                type="tel" 
                placeholder="Phone Number" 
                required 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
              />
            </div>
            <div className="form-field">
              <input 
                type="email" 
                placeholder="Email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          </div>
          <div className="form-section">
            <div className="form-field">
              <input 
                type="text" 
                placeholder="Street No." 
                required 
                value={street} 
                onChange={(e) => setStreet(e.target.value)} 
              />
            </div>
            <div className="form-field">
              <input 
                type="text" 
                placeholder="City" 
                required 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
              />
            </div>
          </div>
          <div className="form-section">
            <div className="form-field">
              <input 
                type="text" 
                placeholder="State" 
                required 
                value={state} 
                onChange={(e) => setState(e.target.value)} 
              />
            </div>
            <div className="form-field">
              <input 
                type="text" 
                placeholder="Country" 
                required 
                value={country} 
                onChange={(e) => setCountry(e.target.value)} 
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button text="Register" style={{ width: '120px' }} />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default Register;
