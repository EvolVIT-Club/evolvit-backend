const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  members: { type: Number, default: 0 },
  events: { type: Number, default: 0 },
  projects: { type: Number, default: 0 },
  partners: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);