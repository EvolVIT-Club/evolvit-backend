const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['team', 'faculty'], default: 'team' },
  role: { type: String,enum: ['Coordinator', 'Team-Lead' , 'Co-Lead' , 'Core-Member' , 'General-Member'], default: 'General-Member' },
  domain: { type: String,enum: ['Tech-Team', 'Design-Team' , 'Media-Team' , 'Event-Management-Team' , 'PR-Team' , 'Finance-Team' , 'Operations-Team' , 'Content-Team '], required : true}, 
  emoji: { type: String, default: '👨‍💻' },
  image: { type: String },
  instagram: { type: String },
  linkedin: { type: String },
  github: { type: String },
  twitter: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);