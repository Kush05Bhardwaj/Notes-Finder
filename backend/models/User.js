const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  },
  avatar: {
    type: String,
    default: 'default-avatar.png'
  },
  university: {
    type: String,
    maxlength: [100, 'University name cannot be more than 100 characters']
  },
  course: {
    type: String,
    maxlength: [100, 'Course name cannot be more than 100 characters']
  },
  year: {
    type: Number,
    min: [1, 'Year must be at least 1'],
    max: [10, 'Year cannot be more than 10']
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
  reputation: {
    type: Number,
    default: 0
  },
  uploadedNotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  }],
  savedNotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  }],
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for uploaded notes count
userSchema.virtual('uploadedNotesCount').get(function() {
  return this.uploadedNotes.length;
});

// Virtual for saved notes count
userSchema.virtual('savedNotesCount').get(function() {
  return this.savedNotes.length;
});

// Encrypt password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Update last login
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
