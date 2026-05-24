const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  toggleFeatured,
} = require('../controllers/projectController');

router.get('/', getProjects);
router.post('/', auth, createProject);
router.put('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);
router.patch('/:id/featured', auth, toggleFeatured);

module.exports = router;