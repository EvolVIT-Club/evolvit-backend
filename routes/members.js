const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const cloudinary = require('../config/cloudinary');
const { getMembers, createMember, updateMember, deleteMember } = require('../controllers/memberController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', getMembers);
router.post('/', auth, upload.single('photo'), createMember);
router.put('/:id', auth, upload.single('photo'), updateMember);
router.delete('/:id', auth, deleteMember);

// Photo upload
router.post('/:id/photo', auth, upload.single('photo'), async (req, res) => {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'evolvit/members' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    const Member = require('../models/Member');
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { image: result.secure_url },
      { new: true }
    );

    res.json(member);
  } catch (err) {
    res.status(500).json({ message: 'Photo upload failed' });
  }
});

module.exports = router;