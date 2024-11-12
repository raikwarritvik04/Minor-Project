const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware'); // Import the authentication middleware

// Example of a protected route to get user-specific data
router.get('/protected-route', authenticateToken, (req, res) => {
    // Here you could fetch user-specific information from the database
    // For demonstration, we can return a simple message
    res.json({ message: 'This is a protected route', user: req.user });
});

// You can add more protected routes as needed
router.get('/user-data', authenticateToken, async (req, res) => {
    try {
        // Fetch user data from the database using req.user.userId
        // const userData = await Users.findById(req.user.userId);
        res.json({ message: 'User data fetched successfully!', userId: req.user.userId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching user data.' });
    }
});

module.exports = router; // Export the router
