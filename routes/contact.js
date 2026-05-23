const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { submitContact, getContacts } = require('../controllers/contactController');

router.post('/', submitContact);        // koi bhi submit kar sakta hai
router.get('/', auth, getContacts);     // sirf tu dekh sakta hai

module.exports = router;