import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import axiosInstance from '../api/axiosConfig';

const Questionnaire = () => {
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [feedback, setFeedback] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setErrorMessage('Session expired. Please log in again.');
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target.checkValidity()) {
      try {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          setErrorMessage('Session expired. Please log in again.');
          navigate('/login');
          return;
        }

        const response = await axiosInstance.post('/questionnaire', {
          userId,
          question1,
          question2,
          question3,
          feedback,
        });

        console.log("Response from server:", response.data);
        navigate('/recommendations');
      } catch (error) {
        console.error("Submission failed:", error);
        setErrorMessage('Failed to submit questionnaire. Please try again.');
      }
    } else {
      e.target.reportValidity();
    }
  };

  return (
    <div className="questionnaire">
      <div className="back-button" onClick={() => navigate(-1)}>
        Back
      </div>
      <div className="questionnaire-box">
        <h3 className="questionnaire-title">Questionnaire</h3>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit} className="fade-in">
          <div className="form-section">
            <label htmlFor="question1">What kind of issue do you have?</label>
            <select
              id="question1"
              value={question1}
              onChange={(e) => setQuestion1(e.target.value)}
              required
            >
              <option value="" disabled>Select an option</option>
              <option value="Career">Career</option>
              <option value="Family Issue">Family Issue</option>
              <option value="Relationship">Relationship</option>
              <option value="Work Place">Work Place</option>
              <option value="Poor Sleep">Poor Sleep</option>
              <option value="Pressure from Society">Pressure from Society</option>
              <option value="Trauma and abuse">Trauma and abuse</option>
              <option value="Financial Strain">Financial Strain</option>
            </select>
          </div>
          <div className="form-section">
            <label htmlFor="question2">How do you feel?</label>
            <select
              id="question2"
              value={question2}
              onChange={(e) => setQuestion2(e.target.value)}
              required
            >
              <option value="" disabled>Select an option</option>
              <option value="Isolated">Isolated</option>
              <option value="Stressed">Stressed</option>
              <option value="Exhuasted">Exhausted</option>
              <option value="Anxious">Anxious</option>
              <option value="Frustrated">Frustrated</option>
            </select>
          </div>
          <div className="form-section">
            <label htmlFor="question3">Do you have a support system?</label>
            <select
              id="question3"
              value={question3}
              onChange={(e) => setQuestion3(e.target.value)}
              required
            >
              <option value="" disabled>Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-section">
            <label htmlFor="feedback">Additional Feedback:</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="3"
              placeholder="Share any additional thoughts or feedback..."
            />
          </div>
          <div className="button-container">
            <Button type="submit" text="Submit" style={{ width: '40%' }} />
          </div>
        </form>
      </div>
      <style jsx>{`
        .questionnaire {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #E6E6FA;
          color: #333;
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
        .questionnaire-box {
          display: flex;
          flex-direction: column;
          background-color: white;
          padding: 1.5rem;
          border-radius: 10px;
          border: 2px solid #4CAF50;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          width: 400px;
          margin-top: -20px;
          animation: fadeIn 0.5s ease-in-out;
        }
        .fade-in {
          animation: fadeIn 1s ease;
        }
        .questionnaire-title {
          margin-bottom: 1rem;
          text-align: center;
        }
        .form-section {
          margin-bottom: 0.75rem;
        }
        label {
          margin-bottom: 0.3rem;
          font-weight: bold;
          font-size: 14px;
        }
        select, textarea {
          padding: 8px;
          border: 2px solid #4CAF50;
          border-radius: 5px;
          font-size: 14px;
          width: 100%;
        }
        .button-container {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }
        .error-message {
          color: red;
          margin-bottom: 1rem;
          text-align: center;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
      `}</style>
    </div>
  );
};

export default Questionnaire;
