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
        setErrorMessage(''); // Reset error message on successful registration

        // Resetting input fields after successful registration
        setUsername('');
        setPassword('');
        setPhone('');
        setEmail('');
        setStreet('');
        setCity('');
        setState('');
        setCountry('');
      } catch (error) {
        console.error("Registration failed:", error);
        setErrorMessage('Registration failed. Please try again.');
        setShowSuccessMessage(false); // Hide success message on failure
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
            background-color: #E6E6FA;
            color: #333;
            position: relative;
            animation: fadeIn 1s ease-in-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          h3 {
            color: #4CAF50;
            margin-bottom: 1rem;
            animation: slideDown 0.5s ease;
          }

          @keyframes slideDown {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          .register-box {
            display: flex;
            flex-direction: column;
            background-color: white;
            padding: 2rem;
            border-radius: 10px;
            border: 2px solid #4CAF50;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            width: 500px;
            animation: slideUp 0.8s ease;
          }

          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
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
            animation: fadeIn 0.5s ease;
          }

          input {
            padding: 10px;
            border: 2px solid #4CAF50;
            border-radius: 5px;
            font-size: 16px;
            width: 90%;
            transition: border-color 0.3s ease;
          }

          input:focus {
            border-color: #006400;
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
            transition: transform 0.3s ease, background-color 0.3s, color 0.3s;
          }

          .back-button {
            left: 20px;
          }

          .login-button {
            right: 20px;
          }

          .back-button:hover {
            transform: translateX(-10px);
            background-color: #4CAF50;
            color: white;
          }

          .login-button:hover {
            transform: translateX(10px);
            background-color: #4CAF50;
            color: white;
          }

          .register-button {
            width: 120px;
            margin-top: 1rem;
            margin-top: 10px;
            animation: bounceIn 0.8s ease;
          }

          @keyframes bounceIn {
            from, 20%, 40%, 60%, 80%, to {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }

          .error-message {
            color: red;
            text-align:center;
            margin-top: 10px;
            animation: shake 0.3s;
          }

          @keyframes shake {
            0% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            100% { transform: translateX(0); }
          }

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
            animation: fadeIn 0.5s ease, slideDown 0.5s ease;
          }
        `}
      </style>

      <div className="back-button" onClick={() => navigate('/registerChoice')}>Back</div>
      <div className="login-button" onClick={() => navigate('/userLogin')}>Login</div>

      <h3>Not part of True Care? Register Now!</h3>

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
