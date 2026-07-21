const Member = require('../models/Member');
const cloudinary = require('../config/cloudinary');

exports.getMembers = async (req, res) => {
  try {
    const { category, domain, role } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (domain) filter.domain = domain;
    if (role) filter.role = role;

    const members = await Member.find(filter).sort({ order: 1, createdAt: 1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMember = async (req, res) => {
  try {
    const memberData = { ...req.body };
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'evolvit/members' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });
      memberData.image = result.secure_url;
    }
    const member = new Member(memberData);
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'evolvit/members' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });
      updateData.image = result.secure_url;
    }
    const member = await Member.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};