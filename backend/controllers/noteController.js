const { validationResult } = require('express-validator');
const Note = require('../models/Note');
const Subject = require('../models/Subject');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
const getNotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const notes = await Note.find({ isActive: true })
      .populate('author', 'name avatar reputation')
      .populate('subject', 'name code')
      .select('title description rating downloads views type difficulty createdAt')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Note.countDocuments({ isActive: true });

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
    console.error('Get notes error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// @desc    Get single note
// @route   GET /api/notes/:id
// @access  Public
const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
      .populate('author', 'name avatar reputation university course')
      .populate('subject', 'name code department')
      .populate('comments.user', 'name avatar')
      .populate('comments.replies.user', 'name avatar');

    if (!note || !note.isActive) {
      return res.status(404).json({ 
        success: false, 
        message: 'Note not found' 
      });
    }

    // Increment views if user is different from author
    if (!req.user || req.user._id.toString() !== note.author._id.toString()) {
      await note.incrementViews();
    }

    res.json({
      success: true,
      data: note
    });
  } catch (error) {
    console.error('Get note error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Placeholder implementations for other methods
const createNote = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
};

const updateNote = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
};

const deleteNote = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
};

const uploadNoteFiles = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
};

const downloadNoteFile = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
};

const rateNote = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
};

const likeNote = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
};

const unlikeNote = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
};

const addComment = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
};

const updateComment = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
};

const deleteComment = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
};

const addReply = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
};

const reportNote = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
};

const getFeaturedNotes = async (req, res) => {
  try {
    const notes = await Note.find({ isActive: true, isFeatured: true })
      .populate('author', 'name avatar reputation')
      .populate('subject', 'name code')
      .select('title description rating downloads views type difficulty createdAt')
      .limit(6)
      .sort({ rating: -1 });

    res.json({
      success: true,
      data: notes
    });
  } catch (error) {
    console.error('Get featured notes error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

const getMyNotes = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
};

const searchNotes = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
};

module.exports = {
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
};
