const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  emoji: { type: String, default: '👨‍💻' },
  image: { type: String },
  category: { type: String, enum: ['team', 'faculty'], default: 'team' },
  instagram: { type: String },
  linkedin: { type: String },
  github: { type: String },
  twitter: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);