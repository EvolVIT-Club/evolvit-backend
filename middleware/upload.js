const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); // your configured cloudinary instance

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'evolvit/members', allowed_formats: ['jpg', 'png', 'jpeg', 'webp'] },
});

module.exports = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });