// server.js
require('dotenv').config(); // Load environment variables
const path = require('path');
const express = require('express');
const cors = require('cors'); // Import the cors package
const { connectDB } = require('./database'); // Import the connectDB function
const app = express();

// Import routes
const userRoutes = require('./routes/userRoutes');
const questionnaireRoutes = require('./routes/questionnaireRoutes');
const recommendationsRoutes = require('./routes/recommendationsRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const psychologistRoutes = require('./routes/psychologistRoutes'); // Import the new psychologist routes
const appointmentRoutes = require('./routes/appointmentRoutes');

// Middleware
app.use(cors({ 
    origin: 'http://localhost:3001', // Allow requests from the frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
})); 

app.use(express.json()); // Middleware for parsing JSON bodies



app.use('/api/images', express.static(path.join(__dirname, 'images')));

// Use routes
app.use('/api', userRoutes); // User-related routes
app.use('/api', questionnaireRoutes); // Questionnaire-related routes
app.use('/api', recommendationsRoutes); // Recommendation-related routes
app.use('/api', protectedRoutes); // Protected routes
app.use('/api', psychologistRoutes); // Psychologist-related routes (newly added)
app.use('/api', appointmentRoutes);

// Root route (optional, but you could keep this for a general welcome)
app.get('/', (req, res) => {
    res.send('Welcome to the Mental Health API!'); // Basic response for root URL
});

// Optional: Basic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' }); // Send a JSON response for server errors
});

// Connect to the database before starting the server
const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start the server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`); // Log server start
        });
    })
    .catch(err => {
        console.error("Failed to connect to the database:", err);
        process.exit(1); // Exit the process if database connection fails
    });
