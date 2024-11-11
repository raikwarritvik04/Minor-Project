// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration function
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', userId: newUser._id.toString() }); // Return userId
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

// User login function
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    console.log("Attempting to login user:", username); // Log the username attempt

    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log("No user found with the provided username."); // Log when no user is found
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        console.log("User found:", user); // Log the found user details

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password validation result:", isPasswordValid); // Log the result of password comparison

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token, userId: user._id.toString() }); // Return userId
    } catch (error) {
        console.error("Error logging in:", error); // Log any error
        res.status(500).json({ message: 'Error logging in' });
    }
};

module.exports = { registerUser, loginUser };
