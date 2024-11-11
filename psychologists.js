const mongoose = require('mongoose');

const psychologistsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }, // Password field for hashing
  specialties: { type: [String], required: true },
  experience: { type: Number, required: true },
  location: { type: String, required: true },
  contactInfo: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  availability: { type: [String], required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  imageUrl: { type: String, required: true },
  description: { type: String, required: false }, // Optional description field
  timings: {
    type: Map, // A map to store key-value pairs for different days/times
    of: String,
    required: false,
  },
  fees: { type: Number, required: false }, // Optional fees field
  education: { type: String, required: false }, // Optional education field
  languagesSpoken: { type: [String], required: false }, // Optional languages field
  zoomLink: { type: String, required: true }, // New field for Zoom link
});

module.exports = mongoose.model('Psychologist', psychologistsSchema);
