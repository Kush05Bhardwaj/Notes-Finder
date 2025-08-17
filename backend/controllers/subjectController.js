const { validationResult } = require('express-validator');
const Subject = require('../models/Subject');
const Note = require('../models/Note');

// @desc    Get all subjects
// @route   GET /api/subjects
// @access  Public
const getSubjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const subjects = await Subject.find({ isActive: true })
      .select('name code description department credits semester year difficulty icon color notesCount averageRating')
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 });

    const total = await Subject.countDocuments({ isActive: true });

    res.json({
      success: true,
      data: {
        subjects,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
          limit
        }
      }
    });
  } catch (error) {
    console.error('Get subjects error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Get single subject
// @route   GET /api/subjects/:id
// @access  Public
const getSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id)
      .populate('prerequisites', 'name code');

    if (!subject || !subject.isActive) {
      return res.status(404).json({ 
        success: false, 
        message: 'Subject not found' 
      });
    }

    res.json({
      success: true,
      data: subject
    });
  } catch (error) {
    console.error('Get subject error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Create new subject
// @route   POST /api/subjects
// @access  Private (Teacher/Admin)
const createSubject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const subject = await Subject.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Subject created successfully',
      data: subject
    });
  } catch (error) {
    console.error('Create subject error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Update subject
// @route   PUT /api/subjects/:id
// @access  Private (Teacher/Admin)
const updateSubject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!subject) {
      return res.status(404).json({ 
        success: false, 
        message: 'Subject not found' 
      });
    }

    res.json({
      success: true,
      message: 'Subject updated successfully',
      data: subject
    });
  } catch (error) {
    console.error('Update subject error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Delete subject
// @route   DELETE /api/subjects/:id
// @access  Private (Admin)
const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({ 
        success: false, 
        message: 'Subject not found' 
      });
    }

    // Soft delete
    subject.isActive = false;
    await subject.save();

    res.json({
      success: true,
      message: 'Subject deleted successfully'
    });
  } catch (error) {
    console.error('Delete subject error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Get notes for a subject
// @route   GET /api/subjects/:id/notes
// @access  Public
const getSubjectNotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const notes = await Note.find({ 
      subject: req.params.id, 
      isActive: true 
    })
      .populate('author', 'name avatar reputation')
      .select('title description rating downloads views type difficulty createdAt')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Note.countDocuments({ 
      subject: req.params.id, 
      isActive: true 
    });

    res.json({
      success: true,
      data: {
        notes,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
          limit
        }
      }
    });
  } catch (error) {
    console.error('Get subject notes error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Search subjects
// @route   GET /api/subjects/search
// @access  Public
const searchSubjects = async (req, res) => {
  try {
    const { q, department, difficulty } = req.query;
    
    let query = { isActive: true };
    
    if (q) {
      query.$text = { $search: q };
    }
    
    if (department) {
      query.department = new RegExp(department, 'i');
    }
    
    if (difficulty) {
      query.difficulty = difficulty;
    }

    const subjects = await Subject.find(query)
      .select('name code description department difficulty icon color notesCount averageRating')
      .limit(20);

    res.json({
      success: true,
      data: subjects
    });
  } catch (error) {
    console.error('Search subjects error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

module.exports = {
  getSubjects,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject,
  getSubjectNotes,
  searchSubjects
};
