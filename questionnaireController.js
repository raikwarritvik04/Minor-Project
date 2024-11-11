// controllers/questionnaireController.js
const Responses = require('../models/responses'); // Ensure that this model is correctly defined

// Function to handle the submission of questionnaire responses
exports.submitResponse = async (req, res) => {
    const { userId, question1, question2, question3, feedback } = req.body;

    // Check if required fields are present
    if (!userId || !question1 || !question2 || !question3) {
        return res.status(400).json({ message: 'All fields except feedback are required.' });
    }

    // Validate userId length
    if (userId.length !== 24) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        // Create a new response document with the submitted data
        const response = await Responses.create({
            userId,
            question1,
            question2,
            question3,
            feedback,
        });

        // Return a success message along with the response data
        res.status(201).json({ message: 'Response saved successfully!', data: response });
    } catch (error) {
        console.error('Error saving response:', error);
        res.status(500).json({ error: 'An error occurred while saving the response.' });
    }
};
