const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure the model path is correct
const router = express.Router();

// Root API route
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Mental Health API!' });
});

// Registration Route
router.post('/register', async (req, res) => {
    const { username, email, password, phone, street, city, state, country } = req.body;

    // Input validation
    if (!username || !email || !password || !phone || !street || !city || !state || !country) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            phone,
            street,
            city,
            state,
            country,
        });

        // Save the new user to the database
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' }); // Use 201 status for resource creation
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Input validation for login
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Find user by username
        console.log(`Attempting to login user: ${username}`); // Debug log
        const user = await User.findOne({ username });
        console.log(`User found: ${user}`); // Debug log

        // Validate password and generate token
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, userId: user._id }); // Send token and userId
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET all users (consider using authentication middleware for this route)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
