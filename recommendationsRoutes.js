const express = require('express');
const router = express.Router();
const psychologist = require('../models/psychologists'); // Import the Psychologist model

// Recommendations Route - Fetch All Psychologists
router.get('/recommendations', async (req, res) => {
    try {
        const psychologists = await psychologist.find({}); // Fetch all psychologists

        if (psychologists.length > 0) {
            res.json({ psychologists });
        } else {
            res.status(404).json({ message: 'No psychologists found in the database.' });
        }
    } catch (error) {
        console.error('Error fetching psychologists:', error);
        res.status(500).json({ error: 'An error occurred while fetching psychologists.' });
    }
});

module.exports = router;
