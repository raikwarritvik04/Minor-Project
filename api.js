const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes'); // Adjust the path as needed

// Example route for /api
router.get('/', (req, res) => {
    res.send('Welcome to the API!'); // You can customize this message
});

// Use userRoutes for /api/users
router.use('/users', userRoutes); // This routes all requests starting with /api/users to userRoutes

module.exports = router;
