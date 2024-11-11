const express = require('express');
const Appointment = require('../models/appointment');
const Psychologist = require('../models/psychologists');
const User = require('../models/user');

const router = express.Router();

// POST: Create a new appointment
router.post('/appointments', async (req, res) => {
  const { userId, psychologistName, psychologistId, date, time, comments, mode } = req.body;

  // Validate input
  if (!userId || !psychologistName || !psychologistId || !date || !time || !mode) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if the user and psychologist exist
    const user = await User.findById(userId);
    const psychologist = await Psychologist.findById(psychologistId);

    if (!user || !psychologist) {
      return res.status(404).json({ message: 'User or Psychologist not found.' });
    }

    // Check if an appointment already exists for this user, psychologist, date, and time
    const existingAppointment = await Appointment.findOne({
      userId,
      psychologistId,
      date,
      time
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'Appointment already exists for this time.' });
    }

    // Create a new appointment
    const newAppointment = new Appointment({
      userId,
      psychologistName,
      psychologistId,
      date,
      time,
      comments,
      mode,
    });

    // Save the appointment
    const savedAppointment = await newAppointment.save();

    // Optionally populate the psychologist details
    await savedAppointment.populate('psychologistId');

    // Return success response
    res.status(201).json({ message: 'Appointment booked successfully!', appointment: savedAppointment });
  } catch (error) {
    console.error('Error creating appointment:', error);

    // Handle other potential errors
    res.status(500).json({ message: 'Error booking the appointment. Please try again.' });
  }
});

module.exports = router;
