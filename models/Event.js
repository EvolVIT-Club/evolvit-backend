const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  about: { type: String },
  venue: { type: String, required: true },
  status: { type: String, enum: ['upcoming', 'past'], default: 'upcoming' },
  registrationLink: { type: String },
  photos: [{ type: String }],
  category: { type: String },
  color: { type: String, default: '#7c3aed' },
  emoji: { type: String, default: 'EVT' },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);