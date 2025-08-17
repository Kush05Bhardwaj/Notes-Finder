const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  content: {
    type: String,
    maxlength: [50000, 'Content cannot be more than 50000 characters']
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: [true, 'Please specify a subject']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please specify an author']
  },
  files: [{
    filename: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    mimetype: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    cloudinaryUrl: String,
    cloudinaryPublicId: String
  }],
  tags: [{
    type: String,
    maxlength: [30, 'Tag cannot be more than 30 characters']
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  type: {
    type: String,
    enum: ['lecture', 'assignment', 'exam', 'project', 'summary', 'other'],
    default: 'lecture'
  },
  language: {
    type: String,
    default: 'English',
    maxlength: [50, 'Language cannot be more than 50 characters']
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
  university: {
    type: String,
    maxlength: [100, 'University name cannot be more than 100 characters']
  },
  professor: {
    type: String,
    maxlength: [100, 'Professor name cannot be more than 100 characters']
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  ratingsCount: {
    type: Number,
    default: 0
  },
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    review: {
      type: String,
      maxlength: [500, 'Review cannot be more than 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  views: {
    type: Number,
    default: 0
  },
  downloads: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  dislikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true,
      maxlength: [500, 'Comment cannot be more than 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    replies: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      text: {
        type: String,
        required: true,
        maxlength: [300, 'Reply cannot be more than 300 characters']
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }]
  }],
  isPremium: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    default: 0,
    min: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  reportCount: {
    type: Number,
    default: 0
  },
  reports: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reason: {
      type: String,
      required: true,
      enum: ['inappropriate', 'spam', 'copyright', 'incorrect', 'other']
    },
    description: {
      type: String,
      maxlength: [500, 'Report description cannot be more than 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for likes count
noteSchema.virtual('likesCount').get(function() {
  return this.likes.length;
});

// Virtual for dislikes count
noteSchema.virtual('dislikesCount').get(function() {
  return this.dislikes.length;
});

// Virtual for comments count
noteSchema.virtual('commentsCount').get(function() {
  return this.comments.length;
});

// Indexes for better search performance
noteSchema.index({ title: 'text', description: 'text', content: 'text' });
noteSchema.index({ subject: 1 });
noteSchema.index({ author: 1 });
noteSchema.index({ tags: 1 });
noteSchema.index({ difficulty: 1 });
noteSchema.index({ type: 1 });
noteSchema.index({ rating: -1 });
noteSchema.index({ views: -1 });
noteSchema.index({ downloads: -1 });
noteSchema.index({ createdAt: -1 });
noteSchema.index({ isFeatured: 1 });
noteSchema.index({ isActive: 1 });

// Method to calculate average rating
noteSchema.methods.calculateAverageRating = function() {
  if (this.ratings.length === 0) {
    this.rating = 0;
    this.ratingsCount = 0;
  } else {
    const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
    this.rating = Math.round((sum / this.ratings.length) * 10) / 10;
    this.ratingsCount = this.ratings.length;
  }
  return this.save();
};

// Method to increment views
noteSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Method to increment downloads
noteSchema.methods.incrementDownloads = function() {
  this.downloads += 1;
  return this.save();
};

// Pre-save middleware to update subject's notes count
noteSchema.post('save', async function() {
  if (this.isNew) {
    const Subject = mongoose.model('Subject');
    await Subject.findByIdAndUpdate(this.subject, { $inc: { notesCount: 1 } });
  }
});

// Pre-remove middleware to update subject's notes count
noteSchema.pre('remove', async function() {
  const Subject = mongoose.model('Subject');
  await Subject.findByIdAndUpdate(this.subject, { $inc: { notesCount: -1 } });
});

module.exports = mongoose.model('Note', noteSchema);
