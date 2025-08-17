const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a subject name'],
    trim: true,
    maxlength: [100, 'Subject name cannot be more than 100 characters']
  },
  code: {
    type: String,
    required: [true, 'Please provide a subject code'],
    unique: true,
    uppercase: true,
    trim: true,
    maxlength: [20, 'Subject code cannot be more than 20 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  department: {
    type: String,
    required: [true, 'Please provide a department'],
    maxlength: [100, 'Department name cannot be more than 100 characters']
  },
  faculty: {
    type: String,
    maxlength: [100, 'Faculty name cannot be more than 100 characters']
  },
  credits: {
    type: Number,
    min: [1, 'Credits must be at least 1'],
    max: [10, 'Credits cannot be more than 10']
  },
  semester: {
    type: Number,
    min: [1, 'Semester must be at least 1'],
    max: [12, 'Semester cannot be more than 12']
  },
  year: {
    type: Number,
    min: [1, 'Year must be at least 1'],
    max: [6, 'Year cannot be more than 6']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  tags: [{
    type: String,
    maxlength: [30, 'Tag cannot be more than 30 characters']
  }],
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  }],
  icon: {
    type: String,
    default: '📚'
  },
  color: {
    type: String,
    default: '#3B82F6' // blue-500
  },
  isActive: {
    type: Boolean,
    default: true
  },
  notesCount: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalViews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for notes
subjectSchema.virtual('notes', {
  ref: 'Note',
  localField: '_id',
  foreignField: 'subject'
});

// Index for better search performance
subjectSchema.index({ name: 'text', code: 'text', description: 'text' });
subjectSchema.index({ department: 1 });
subjectSchema.index({ semester: 1, year: 1 });

// Update notes count when notes are added/removed
subjectSchema.methods.updateNotesCount = async function() {
  const Note = mongoose.model('Note');
  this.notesCount = await Note.countDocuments({ subject: this._id, isActive: true });
  return this.save();
};

// Update average rating
subjectSchema.methods.updateAverageRating = async function() {
  const Note = mongoose.model('Note');
  const result = await Note.aggregate([
    { $match: { subject: this._id, isActive: true } },
    { $group: { _id: null, avgRating: { $avg: '$rating' } } }
  ]);
  
  this.averageRating = result.length > 0 ? Math.round(result[0].avgRating * 10) / 10 : 0;
  return this.save();
};

module.exports = mongoose.model('Subject', subjectSchema);
