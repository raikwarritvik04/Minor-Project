const express = require('express');
const router = express.Router();
const { submitResponse } = require('../controllers/questionnaireController'); // Ensure this path is correct

// Questionnaire Response Route
router.post('/questionnaire', submitResponse); // Use the controller function for handling the submission

module.exports = router;
