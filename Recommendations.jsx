import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosConfig'; // Import the Axios instance

const Recommendations = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchPsychologists = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/recommendations'); // Use axios for GET request
        setPsychologists(response.data.psychologists); // Assuming the response structure
      } catch (error) {
        console.error('Error fetching psychologists:', error);
        setErrorMessage('Error fetching psychologists. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPsychologists();
  }, []);

  return (
    <div className="recommendations-container">
      <style>
  {`
    .recommendations-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-color: #f0f8ff;
    }

    .recommendations-box {
      width: 500px;
      padding: 2rem;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
      border: 2px solid #4CAF50; /* Add this line for the green border */
    }

    h2 {
      margin-top: 0;
      color: #333;
    }

    h3 {
      color: #555;
      margin-bottom: 1rem;
    }

    ul {
      list-style-type: none;
      padding: 0;
      color: #4CAF50;
      font-size: 1rem;
    }

    li {
      margin: 0.5rem 0;
      padding: 0.5rem;
      border-bottom: 1px solid #e0e0e0;
    }

    .error-message {
      color: red;
      margin: 1rem 0;
    }

    .loading-message {
      color: #555;
      margin: 1rem 0;
    }
  `}
</style>


      <div className="recommendations-box">
        <h2>Our Psychologists</h2>
        <h3>Explore our recommended professionals:</h3>
        {loading ? (
          <div className="loading-message">Loading...</div>
        ) : errorMessage ? (
          <div className="error-message">{errorMessage}</div>
        ) : (
          <ul>
            {psychologists.length > 0 ? (
              psychologists.map((psych, index) => (
                <li key={index}>
                  {psych.name} - Specialties: {psych.specialties.join(', ')}
                  <br />
                  Location: {psych.location}
                  <br />
                  Rating: {psych.rating} / 5
                </li>
              ))
            ) : (
              <li>No psychologists available at this time.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
