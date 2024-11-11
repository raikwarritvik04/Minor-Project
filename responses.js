// models/responses.js
const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User', 
        index: true // Indexing userId for optimized query performance
    },
    question1: { type: String, required: true },
    question2: { type: String, required: true },
    question3: { type: String, required: true },
    feedback: { type: String },
    submittedAt: { type: Date, default: Date.now }
});

// Create the Responses model from the schema
const Responses = mongoose.model('Responses', responseSchema);

module.exports = Responses;
