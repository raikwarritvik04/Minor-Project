import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import defaultImage from '../images/Psychologist.jpeg';

const PsychologistDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { psychologistName } = location.state || {};

  const [psychologist, setPsychologist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [animationClass, setAnimationClass] = useState(''); // State for animation

  const getImageUrl = (imageUrl) => {
    const serverUrl = 'http://localhost:3000/api/images/';
    return imageUrl ? `${serverUrl}${imageUrl.replace(/^(\.\/|\.\.\/)*/, '')}` : defaultImage;
  };

  useEffect(() => {
    const fetchPsychologistDetails = async () => {
      if (!psychologistName) {
        setError('Invalid data. Please try again.');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await axiosInstance.get(`/psychologists?name=${psychologistName}`);
        setPsychologist(response.data);
      } catch (error) {
        console.error('Error fetching psychologist details:', error);
        setError('Unable to fetch psychologist details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPsychologistDetails();
    setAnimationClass('fade-in'); // Trigger animation on component load
  }, [psychologistName]);

  const handleOfflineClick = () => {
    const userId = localStorage.getItem('userId'); // Get userId from localStorage
    navigate('/offline', { state: { userId, psychologistName } });
  };

  const handleOnlineClick = () => {
    const userId = localStorage.getItem('userId'); // Get userId from localStorage
    navigate('/online', { state: { userId, psychologistName } });
  };

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={`psychologist-detail ${animationClass}`}>
      <style>
        {`
          .psychologist-detail {
            display: flex;
            justify-content: center;
            padding: 3rem;
            background-color: #E6E6FA;
            margin-bottom: 2rem;
            opacity: 0; /* Initial state for animation */
            transform: translateY(20px); /* Initial state for slide-in */
          }

          .fade-in {
            animation: fadeIn 1s ease forwards;
          }

          @keyframes fadeIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .profile-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #F5F5F5;
            border: 2px solid #4CAF50;
            border-radius: 12px;
            padding: 2rem;
            width: 100%;
            max-width: 750px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .profile-header {
            text-align: center;
            margin-bottom: 2rem;
          }

          img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-bottom: 1rem;
            object-fit: cover;
            border: 4px solid #4CAF50;
          }

          h2 {
            font-size: 2rem;
            color: #333;
            font-weight: bold;
          }

          .specialties {
            font-size: 1.1rem;
            color: #333;
            margin-top: 1rem;
            text-align: center;
          }

          .description, .fees, .education, .languages {
            margin-top: 1.5rem;
            font-size: 1.1rem;
            color: #555;
            text-align: left;
            width: 100%;
          }

          .timings {
            display: flex;
            align-items: flex-start;
            font-size: 1.1rem;
            color: #555;
            width: 100%;
            margin-top: 0.5rem;
          }

          .timing-details {
            display: flex;
            margin-left: 30px;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: flex-start;
          }

          .timing-details div {
            display: flex;
            gap: 0.5rem;
            font-size: 1rem;
            color: #333;
            margin-right: 1rem;
          }

          .languages {
            color: #4CAF50;
            font-weight: bold;
          }

          .fees, .education {
            font-weight: bold;
            color: #333;
          }

          .footer {
            margin-top: 3rem;
            font-size: 1rem;
            text-align: center;
            color: #777;
          }

          .appointment-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            padding: 1rem;
            margin-top: 2rem;
            border-top: 2px solid #4CAF50;
          }

          .appointment-label {
            background-color: #4CAF50;
            color: white;
            padding: 0.75rem 1.5rem;
            font-size: 1.1rem;
            border-radius: 8px;
            text-align: center;
            font-weight: bold;
            width: fit-content;
          }

          .mode-button {
            background-color: #D96A28;
            color: white;
            padding: 0.75rem 1.5rem;
            font-size: 1.1rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .mode-prefer {
            font-size: 17px;
          }

          .appointment-label:hover {
            background-color: #45A049;
          }
          
          .mode-button:hover {
            background-color: #BF5A20;
          }

          .mode-buttons {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
          }
        `}
      </style>

      {psychologist ? (
        <div className="profile-container">
          <div className="profile-header">
            <img src={getImageUrl(psychologist.imageUrl)} alt={psychologist.name} />
            <h2>{psychologist.name}</h2>
            <div className="specialties">
              <strong>Specialties:</strong> {psychologist.specialties?.join(', ') || 'N/A'}
            </div>
          </div>

          <div className="description">
            <strong>Description:</strong> {psychologist.description || 'N/A'}
          </div>

          <div className="timings">
            <strong>Availability:</strong>
            <div className="timing-details">
              {psychologist.timings ? (
                Object.entries(psychologist.timings).map(([day, time]) => (
                  <div key={day}>
                    <strong>{day}:</strong> {time}
                  </div>
                ))
              ) : (
                <div>No availability listed</div>
              )}
            </div>
          </div>

          <div className="fees">
            <strong>Fees:</strong> ₹{psychologist.fees || 'N/A'}
          </div>

          <div className="education">
            <strong>Education:</strong> {psychologist.education || 'N/A'}
          </div>

          <div className="languages">
            <strong>Languages Spoken:</strong> {psychologist.languagesSpoken?.join(', ') || 'N/A'}
          </div>

          <div className="appointment-box">
            <div className="appointment-label">Book-Appointment</div>
            <p className='mode-prefer'>Which Mode do you prefer:</p>
            <div className="mode-buttons">
              <button className="mode-button" onClick={handleOfflineClick}>Offline-Mode</button>
              <button className="mode-button" onClick={handleOnlineClick}>Online-Mode</button>
            </div>
          </div>
        </div>
      ) : (
        <div>No details available for this psychologist.</div>
      )}
    </div>
  );
};

export default PsychologistDetail;
