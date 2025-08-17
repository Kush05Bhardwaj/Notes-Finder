const express = require('express');
const { body } = require('express-validator');
const {
  getSubjects,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject,
  getSubjectNotes,
  searchSubjects
} = require('../controllers/subjectController');
const { protect, admin, teacherOrAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules
const createSubjectValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Subject name must be between 2 and 100 characters'),
  body('code').trim().isLength({ min: 2, max: 20 }).withMessage('Subject code must be between 2 and 20 characters'),
  body('department').trim().isLength({ min: 2, max: 100 }).withMessage('Department must be between 2 and 100 characters'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
  body('credits').optional().isInt({ min: 1, max: 10 }).withMessage('Credits must be between 1 and 10'),
  body('semester').optional().isInt({ min: 1, max: 12 }).withMessage('Semester must be between 1 and 12'),
  body('year').optional().isInt({ min: 1, max: 6 }).withMessage('Year must be between 1 and 6'),
  body('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid difficulty level')
];

const updateSubjectValidation = [
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Subject name must be between 2 and 100 characters'),
  body('code').optional().trim().isLength({ min: 2, max: 20 }).withMessage('Subject code must be between 2 and 20 characters'),
  body('department').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Department must be between 2 and 100 characters'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
  body('credits').optional().isInt({ min: 1, max: 10 }).withMessage('Credits must be between 1 and 10'),
  body('semester').optional().isInt({ min: 1, max: 12 }).withMessage('Semester must be between 1 and 12'),
  body('year').optional().isInt({ min: 1, max: 6 }).withMessage('Year must be between 1 and 6'),
  body('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid difficulty level')
];

// Public routes
router.get('/', getSubjects);
router.get('/search', searchSubjects);
router.get('/:id', getSubject);
router.get('/:id/notes', getSubjectNotes);

// Protected routes (admin/teacher only)
router.post('/', protect, teacherOrAdmin, createSubjectValidation, createSubject);
router.put('/:id', protect, teacherOrAdmin, updateSubjectValidation, updateSubject);
router.delete('/:id', protect, admin, deleteSubject);

module.exports = router;
