const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  projectLink: { type: String },
  githubLink: { type: String },
  color: { type: String, default: '#7c3aed' },
  featured: { type: Boolean, default: false }, 
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);