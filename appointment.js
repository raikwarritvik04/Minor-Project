const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  psychologistName: { type: String, required: true },
  psychologistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Psychologist', required: true },
  date: { type: String, required: true },  // Consider using Date if storing as an actual date
  time: { type: String, required: true },
  comments: { type: String },
  mode: { type: String, enum: ['offline', 'online'], required: true },
}, { timestamps: true });

// Create a compound unique index on userId, psychologistId, date, and time
appointmentSchema.index({ userId: 1, psychologistId: 1, date: 1, time: 1 }, { unique: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
