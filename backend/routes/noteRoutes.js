const express = require('express');
const { body } = require('express-validator');
const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  uploadNoteFiles,
  downloadNoteFile,
  rateNote,
  likeNote,
  unlikeNote,
  addComment,
  updateComment,
  deleteComment,
  addReply,
  reportNote,
  getFeaturedNotes,
  getMyNotes,
  searchNotes
} = require('../controllers/noteController');
const { protect, optionalAuth, admin, teacherOrAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules
const createNoteValidation = [
  body('title').trim().isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
  body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('subject').isMongoId().withMessage('Valid subject ID is required'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid difficulty level'),
  body('type').optional().isIn(['lecture', 'assignment', 'exam', 'project', 'summary', 'other']).withMessage('Invalid note type')
];

const updateNoteValidation = [
  body('title').optional().trim().isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
  body('description').optional().trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be between 10 and 1000 characters'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid difficulty level'),
  body('type').optional().isIn(['lecture', 'assignment', 'exam', 'project', 'summary', 'other']).withMessage('Invalid note type')
];

const rateNoteValidation = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('review').optional().trim().isLength({ max: 500 }).withMessage('Review must be less than 500 characters')
];

const commentValidation = [
  body('text').trim().isLength({ min: 1, max: 500 }).withMessage('Comment must be between 1 and 500 characters')
];

const replyValidation = [
  body('text').trim().isLength({ min: 1, max: 300 }).withMessage('Reply must be between 1 and 300 characters')
];

const reportValidation = [
  body('reason').isIn(['inappropriate', 'spam', 'copyright', 'incorrect', 'other']).withMessage('Invalid report reason'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description must be less than 500 characters')
];

// Public routes
router.get('/', optionalAuth, getNotes);
router.get('/featured', getFeaturedNotes);
router.get('/search', optionalAuth, searchNotes);
router.get('/:id', optionalAuth, getNote);
router.get('/:id/download/:fileId', downloadNoteFile);

// Protected routes
router.post('/', protect, createNoteValidation, createNote);
router.post('/:id/upload', protect, uploadNoteFiles);
router.get('/user/my-notes', protect, getMyNotes);
router.put('/:id', protect, updateNoteValidation, updateNote);
router.delete('/:id', protect, deleteNote);

// Interaction routes
router.post('/:id/rate', protect, rateNoteValidation, rateNote);
router.post('/:id/like', protect, likeNote);
router.delete('/:id/like', protect, unlikeNote);
router.post('/:id/comments', protect, commentValidation, addComment);
router.put('/:id/comments/:commentId', protect, commentValidation, updateComment);
router.delete('/:id/comments/:commentId', protect, deleteComment);
router.post('/:id/comments/:commentId/replies', protect, replyValidation, addReply);
router.post('/:id/report', protect, reportValidation, reportNote);

module.exports = router;
