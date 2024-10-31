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
    // Fetch userId from localStorage on component mount
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

        // Ensure userId is available
        if (!userId) {
          setErrorMessage('Session expired. Please log in again.');
          navigate('/login');
          return;
        }

        // Send questionnaire data along with userId to the backend
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
      <div className="questionnaire-box">
        <h3 className="questionnaire-title">Questionnaire</h3>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <label htmlFor="question1">How would you rate your current mental health?</label>
            <select
              id="question1"
              value={question1}
              onChange={(e) => setQuestion1(e.target.value)}
              required
            >
              <option value="" disabled>Select an option</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
          <div className="form-section">
            <label htmlFor="question2">How often do you feel stressed?</label>
            <select
              id="question2"
              value={question2}
              onChange={(e) => setQuestion2(e.target.value)}
              required
            >
              <option value="" disabled>Select an option</option>
              <option value="Never">Never</option>
              <option value="Rarely">Rarely</option>
              <option value="Sometimes">Sometimes</option>
              <option value="Often">Often</option>
              <option value="Always">Always</option>
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
          background-color: #87CEEB;
          color: #333;
        }
        .questionnaire-box {
          display: flex;
          flex-direction: column;
          background-color: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          width: 400px;
          margin-top: -20px;
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
      `}</style>
    </div>
  );
};

export default Questionnaire;
