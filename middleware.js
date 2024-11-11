const jwt = require('jsonwebtoken');

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from 'Bearer <token>'
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' }); // If no token is provided, respond with 401

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token.' }); // If token is invalid, respond with 403
        req.user = user; // Attach the user info to the request object
        next(); // Proceed to the next middleware/route handler
    });
};

module.exports = authenticateToken; // Export the middleware function
