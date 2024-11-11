import React from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code'; // QR code library
import defaultImage from '../images/Psychologist.jpeg'; // Default image fallback

// Function to handle image URL processing
const getImageUrl = (imageUrl) => {
  const serverUrl = 'http://localhost:3000/api/images/';
  return imageUrl ? `${serverUrl}${imageUrl.replace(/^(\.\/|\.\.\/)*/, '')}` : defaultImage;
};

const Confirmation = () => {
  const location = useLocation();
  const { psychologist, zoomLink, appointmentDate, appointmentTime } = location.state || {};

  return (
    <div className="confirmation-page">
      <style>
        {`
          body {
            background-color: #E6E6FA;
            font-family: Arial, sans-serif;
          }

          .confirmation-page {
            padding: 3rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }

          .confirmation-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 40px;
            background-color: #ffffff;
            border: 2px solid #4CAF50;
            border-radius: 12px;
            padding: 1rem;
            width: 100%;
            max-width: 700px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }

          h2 {
            font-size: 2rem;
            color: #333;
            font-weight: bold;
            margin-bottom: 2rem;
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

          .psychologist-details {
            margin-top: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
          }

          .psychologist-details img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 1rem;
            border: 4px solid #4CAF50;
          }

          .psychologist-details h3 {
            font-size: 1.8rem;
            color: #333;
            margin-bottom: 0.5rem;
          }

          .appointment-info {
            font-size: 1.2rem;
            color: black;
            margin: 0.5rem 0;
            font-weight: bold;
          }

          .qr-code {
            margin-top: 1rem;
          }

          a {
            color: #4CAF50;
            text-decoration: none;
            font-weight: bold;
          }

          a:hover {
            text-decoration: underline;
          }

          .confirm-message {
            color: #4CAF50;
            font-size: 24px;
          }

          .small-text {
            font-size: 10px;
          }
        `}
      </style>

      <div>
        <p className='confirm-message'>Appointment Confirmed!</p>
      </div>

      <div className="confirmation-container">

        {psychologist && (
          <div className="psychologist-details">
            <img src={getImageUrl(psychologist.imageUrl)} alt={psychologist.name} />
            <h3>{psychologist.name}</h3>
            <br></br>
            <p className="appointment-info">Appointment Date: {appointmentDate}</p> {/* Display date */}
            <p className="appointment-info">Appointment Time: {appointmentTime}</p> {/* Display time */}
            <h4>Please kindly join the Meeting on the appointment time through the given link</h4>
            <p>
              Zoom Link: <a href={zoomLink} target="_blank" rel="noopener noreferrer">{zoomLink}</a>
            </p>
            
            <p>*Scan the QR code below for payment*</p>
            <div className="qr-code">
              <QRCode value={zoomLink} />
            </div>
          </div>
        )}
        <p className='small-text'>*Please take a screenshot or download this page to save details.*</p>
      </div>
    </div>
  );
};

export default Confirmation;
