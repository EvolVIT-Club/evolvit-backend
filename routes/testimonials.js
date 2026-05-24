const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const cloudinary = require('../config/cloudinary');
const { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } = require('../controllers/testimonialController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', getTestimonials);
router.post('/', auth, createTestimonial);
router.put('/:id', auth, updateTestimonial);
router.delete('/:id', auth, deleteTestimonial);

// Photo upload
router.post('/:id/photo', auth, upload.single('photo'), async (req, res) => {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'evolvit/testimonials' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    const Testimonial = require('../models/Testimonial');
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { avatar: result.secure_url },
      { new: true }
    );

    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: 'Photo upload failed' });
  }
});

module.exports = router;