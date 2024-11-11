import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import defaultImage from '../images/Psychologist.jpeg';
import { format, parse, isWithinInterval } from 'date-fns';

const Online = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { psychologistName, userId } = location.state || {};

  const [psychologist, setPsychologist] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [comments, setComments] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!psychologistName || !userId) {
      setError('Invalid data. Please try again.');
      setLoading(false);
      return;
    }

    const fetchPsychologistDetails = async () => {
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
  }, [psychologistName, userId]);

  if (loading) return <div></div>;
  if (error) return <div>{error}</div>;

  const getImageUrl = (imageUrl) => {
    const serverUrl = 'http://localhost:3000/api/images/';
    return imageUrl ? `${serverUrl}${imageUrl.replace(/^(\.\/|\.\.\/)*/, '')}` : defaultImage;
  };

  const handleDateChange = (e) => setAppointmentDate(e.target.value);
  const handleTimeChange = (e) => setAppointmentTime(e.target.value);
  const handleCommentsChange = (e) => setComments(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !psychologistName || !appointmentDate || !appointmentTime || !psychologist?._id) {
      setStatusMessage('All fields are required.');
      return;
    }

    if (appointmentTime.split(':')[1] !== '00') {
      setStatusMessage('Please select a time in full hours (e.g., 9:00, 10:00).');
      return;
    }

    const formattedDate = format(new Date(appointmentDate), 'yyyy-MM-dd');
    const formattedTime = format(parse(appointmentTime, 'HH:mm', new Date()), 'HH:mm');

    const selectedDate = new Date(appointmentDate);
    const dayOfWeek = format(selectedDate, 'EEEE');
    const availabilityTime = psychologist?.timings?.[dayOfWeek];

    if (!availabilityTime) {
      setStatusMessage(`No availability on ${dayOfWeek}.`);
      return;
    }

    const [startTime, endTime] = availabilityTime.split(' - ');
    const appointmentStartTime = parse(appointmentTime, 'HH:mm', selectedDate);
    const availableStartTime = parse(startTime, 'h:mm a', selectedDate);
    const availableEndTime = parse(endTime, 'h:mm a', selectedDate);

    if (!isWithinInterval(appointmentStartTime, { start: availableStartTime, end: availableEndTime })) {
      setStatusMessage(`Please select a time between ${startTime} and ${endTime} on ${dayOfWeek}.`);
      return;
    }

    try {
      const response = await axiosInstance.post('/appointments', {
        userId,
        psychologistName,
        psychologistId: psychologist._id,
        date: formattedDate,
        time: formattedTime,
        comments: comments || '',
        mode: 'online'
      });

      if (response.status === 201) {
        setStatusMessage('Your online appointment has been successfully booked!');
        setAppointmentDate('');
        setAppointmentTime('');
        setComments('');

        // After successful booking, navigate to the Confirmation page
        navigate('/confirmation', {
          state: {
            psychologist: psychologist,
            zoomLink: psychologist.zoomLink,
            userId: userId,
            appointmentDate: formattedDate, // pass formatted date
            appointmentTime: formattedTime  // pass formatted time
          }
        });
      } else {
        setStatusMessage('Failed to book the online appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error booking online appointment:', error.response?.data || error.message);
      setStatusMessage('An error occurred while booking the online appointment. Please try again later.');
    }
  };

  return (
    <div className="appointment-online">
      <style>
        {`
          body {
            background-color: #E6E6FA;
            transition: background-color 0.5s ease-in-out;
          }

          .appointment-online {
            padding: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 700px;
            margin: 0 auto;
            margin-top: 20px;
            border-radius: 12px;
            animation: fadeIn 0.5s ease-in;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
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
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-bottom: 2rem;
            animation: slideUp 0.6s ease-in-out;
          }

          @keyframes slideUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .profile-header {
            text-align: center;
            margin-bottom: 1rem;
          }

          img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-bottom: 1rem;
            object-fit: cover;
            border: 4px solid #4CAF50;
            transition: transform 0.3s ease-in-out;
          }

          img:hover {
            transform: scale(1.1);
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

          .form-group {
            margin-top: 20px;
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            width: 100%;
            transition: all 0.3s ease-in-out;
          }

          label {
            font-size: 1.1rem;
            color: #333;
            margin-right: 1rem;
            flex-shrink: 0;
          }

          input, textarea {
            width: 100%;
            padding: 0.5rem;
            font-size: 1rem;
            border: 2px solid #4CAF50;
            border-radius: 8px;
            flex-grow: 1;
            transition: border-color 0.3s;
          }

          input:focus, textarea:focus {
            border-color: #D96A28;
          }

          button {
            background-color: #D96A28;
            color: white;
            padding: 0.75rem 1.5rem;
            font-size: 1.1rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s;
            margin-left: 65px;
          }

          button:hover {
            background-color: #C25B25;
          }

          .status-message {
            margin-top: 1rem;
            font-size: 1.1rem;
            color: #333;
            animation: fadeIn 0.5s ease-in-out;
          }
        `}
      </style>

      {psychologist && (
        <div className="profile-container">
          <div className="profile-header">
            <img src={getImageUrl(psychologist.imageUrl)} alt={psychologist.name} />
            <h2>{psychologist.name}</h2>
            <div className="specialties">
              <strong>Specialties:</strong> {psychologist.specialties?.join(', ') || 'N/A'}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="appointmentDate">Date:</label>
              <input type="date" id="appointmentDate" value={appointmentDate} onChange={handleDateChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="appointmentTime">Time:</label>
              <input type="time" id="appointmentTime" value={appointmentTime} onChange={handleTimeChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="comments">Comments:</label>
              <textarea id="comments" value={comments} onChange={handleCommentsChange} placeholder="optional" />
            </div>

            <button type="submit" className="submit-button">Book-Appointment</button>
          </form>

          {statusMessage && <p className="status-message">{statusMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default Online;
