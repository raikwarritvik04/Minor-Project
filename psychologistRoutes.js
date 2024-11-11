const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Psychologist = require('../models/psychologists');
const router = express.Router();

// Endpoint to get a psychologist's details by name (userId is optional for now)
router.get('/psychologists', async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Missing psychologist name' });
  }

  try {
    const psychologist = await Psychologist.findOne({ name });

    if (!psychologist) {
      return res.status(404).json({ error: 'Psychologist not found' });
    }

    res.status(200).json(psychologist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Registration Route for Psychologists
router.post('/register', async (req, res) => {
  const { name, email, password, phone, specialties, experience, location, availability, imageUrl, zoomLink } = req.body;

  // Input validation
  if (!name || !email || !password || !phone || !specialties || !experience || !location || !availability || !imageUrl || !zoomLink) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if psychologist already exists
    const existingPsychologist = await Psychologist.findOne({ email });
    if (existingPsychologist) {
      return res.status(400).json({ error: 'Psychologist already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new psychologist
    const newPsychologist = new Psychologist({
      name,
      email,
      password: hashedPassword,
      phone,
      specialties,
      experience,
      location,
      availability,
      imageUrl,
      zoomLink,
    });

    // Save the new psychologist to the database
    await newPsychologist.save();
    res.status(201).json({ message: 'Psychologist registered successfully!' });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login Route for Psychologists
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Input validation for login
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find psychologist by email
    const psychologist = await Psychologist.findOne({ email });

    // Validate password and generate token
    if (psychologist && await bcrypt.compare(password, psychologist.password)) {
      const token = jwt.sign({ psychologistId: psychologist._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, psychologistId: psychologist._id }); // Send token and psychologistId
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to create a new psychologist with a hashed password
router.post('/psychologists', async (req, res) => {
  try {
    const { password, ...otherFields } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new psychologist with the hashed password
    const newPsychologist = new Psychologist({
      ...otherFields,
      password: hashedPassword,
    });

    await newPsychologist.save();
    res.status(201).json({ message: 'Psychologist created successfully', psychologist: newPsychologist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
