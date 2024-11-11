import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../images/Psychologist.jpeg';

const Recommendations = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPsychologists = async () => {
      setLoading(true);
      const userId = localStorage.getItem('userId');

      if (!userId) {
        setErrorMessage('Session expired. Please log in again.');
        navigate('/login');
        return;
      }

      try {
        const response = await axiosInstance.get(`/recommendations?userId=${userId}`);
        setPsychologists(response.data.psychologists);
      } catch (error) {
        console.error('Error fetching psychologists:', error);
        setErrorMessage('Error fetching psychologists. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPsychologists();
  }, [navigate]);

  const getImageUrl = (imageUrl) => {
    const serverUrl = 'http://localhost:3000/api/images/';
    return imageUrl ? `${serverUrl}${imageUrl.replace(/^(\.\/|\.\.\/)*/, '')}` : defaultImage;
  };

  const handleCardClick = (psychologist) => {
    const userId = localStorage.getItem('userId'); // Retrieve userId again
    navigate('/psychologist', { state: { userId, psychologistName: psychologist.name } });
  };

  return (
    <div className="recommendations-container">
      <style>
        {`
          .recommendations-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            min-height: 100vh;
            background-color: #E6E6FA;
            padding: 2rem;
          }

          .recommendations-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            width: 100%;
            max-width: 1200px;
            margin-bottom: 2rem;
            background-color: #E6E6FA;
          }

          .psychologist-card {
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            padding: 1rem;
            text-align: center;
            border: 2px solid #4CAF50;
            cursor: pointer;
            transition: transform 0.2s ease, opacity 0.5s ease-in-out;
            opacity: 0;
            animation: fadeIn 0.5s forwards;
          }

          .psychologist-card:hover {
            transform: scale(1.05);
            box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin-bottom: 1rem;
            transition: transform 0.3s ease-in-out;
          }

          img:hover {
            transform: scale(1.1);
          }

          .error-message {
            color: red;
            margin: 1rem 0;
          }

          .loading-message {
            color: #555;
            margin: 1rem 0;
          }
          
          h2 {
            text-align: center;
          }

          h3 {
            text-align: center;
          }
        `}
      </style>

      <div className="recommendations-box">
        <h2>Our Psychologists</h2>
        <h3>Explore our recommended professionals:</h3>
        <br/>
        {loading ? (
          <div className="loading-message">Loading...</div>
        ) : errorMessage ? (
          <div className="error-message">{errorMessage}</div>
        ) : (
          <div className="recommendations-grid">
            {psychologists.length > 0 ? (
              psychologists.map((psych, index) => (
                <div
                  key={index}
                  className="psychologist-card"
                  style={{ animationDelay: `${index * 0.1}s` }} // Staggered fade-in
                  onClick={() => handleCardClick(psych)}
                >
                  <img src={getImageUrl(psych.imageUrl)} alt="Psychologist" />
                  <div>
                    <strong>{psych.name}</strong>
                    <br />
                    Specialties: {psych.specialties.join(', ')}
                  </div>
                </div>
              ))
            ) : (
              <div>No psychologists available at this time.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
