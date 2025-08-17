const express = require('express');
const { body } = require('express-validator');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserNotes,
  getUserStats,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules
const updateUserValidation = [
  body('name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('university').optional().trim().isLength({ max: 100 }).withMessage('University name must be less than 100 characters'),
  body('course').optional().trim().isLength({ max: 100 }).withMessage('Course name must be less than 100 characters'),
  body('year').optional().isInt({ min: 1, max: 10 }).withMessage('Year must be between 1 and 10'),
  body('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio must be less than 500 characters')
];

// Public routes
router.get('/:id', getUser);
router.get('/:id/notes', getUserNotes);
router.get('/:id/stats', getUserStats);

// Protected routes
router.get('/', protect, admin, getUsers);
router.put('/:id', protect, updateUserValidation, updateUser);
router.delete('/:id', protect, admin, deleteUser);

// Social features
router.post('/:id/follow', protect, followUser);
router.delete('/:id/follow', protect, unfollowUser);
router.get('/:id/followers', getFollowers);
router.get('/:id/following', getFollowing);

module.exports = router;
