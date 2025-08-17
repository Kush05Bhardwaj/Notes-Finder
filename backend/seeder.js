const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Subject = require('./models/Subject');
const Note = require('./models/Note');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const sampleUsers = [
  {
    name: 'Dr. John Smith',
    email: 'john.smith@university.edu',
    password: 'password123',
    role: 'teacher',
    university: 'Tech University',
    course: 'Computer Science',
    bio: 'Professor of Computer Science with 15 years of experience.'
  },
  {
    name: 'Jane Doe',
    email: 'jane.doe@student.edu',
    password: 'password123',
    role: 'student',
    university: 'Tech University',
    course: 'Computer Science',
    year: 3,
    bio: 'Third-year CS student passionate about web development.'
  },
  {
    name: 'Admin User',
    email: 'admin@notesfinder.com',
    password: 'admin123',
    role: 'admin',
    university: 'Notes Finder',
    bio: 'Platform administrator'
  }
];

const sampleSubjects = [
  {
    name: 'Data Structures and Algorithms',
    code: 'CS201',
    description: 'Introduction to fundamental data structures and algorithms',
    department: 'Computer Science',
    faculty: 'Dr. John Smith',
    credits: 4,
    semester: 3,
    year: 2,
    difficulty: 'intermediate',
    tags: ['programming', 'algorithms', 'data-structures'],
    icon: '💻',
    color: '#3B82F6'
  },
  {
    name: 'Database Management Systems',
    code: 'CS301',
    description: 'Comprehensive study of database design and management',
    department: 'Computer Science',
    faculty: 'Dr. Alice Johnson',
    credits: 3,
    semester: 5,
    year: 3,
    difficulty: 'intermediate',
    tags: ['database', 'sql', 'data-modeling'],
    icon: '🗄️',
    color: '#10B981'
  },
  {
    name: 'Web Development',
    code: 'CS401',
    description: 'Modern web development with React and Node.js',
    department: 'Computer Science',
    faculty: 'Prof. Mike Wilson',
    credits: 3,
    semester: 7,
    year: 4,
    difficulty: 'advanced',
    tags: ['web', 'react', 'nodejs', 'javascript'],
    icon: '🌐',
    color: '#F59E0B'
  },
  {
    name: 'Linear Algebra',
    code: 'MATH201',
    description: 'Vector spaces, matrices, and linear transformations',
    department: 'Mathematics',
    faculty: 'Dr. Sarah Brown',
    credits: 4,
    semester: 3,
    year: 2,
    difficulty: 'intermediate',
    tags: ['mathematics', 'vectors', 'matrices'],
    icon: '📐',
    color: '#8B5CF6'
  },
  {
    name: 'Organic Chemistry',
    code: 'CHEM301',
    description: 'Study of carbon-based compounds and reactions',
    department: 'Chemistry',
    faculty: 'Prof. Robert Lee',
    credits: 4,
    semester: 5,
    year: 3,
    difficulty: 'advanced',
    tags: ['chemistry', 'organic', 'reactions'],
    icon: '🧪',
    color: '#EF4444'
  }
];

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Subject.deleteMany({});
    await Note.deleteMany({});

    console.log('Existing data cleared');

    // Create users
    const users = [];
    for (const userData of sampleUsers) {
      const salt = await bcrypt.genSalt(12);
      userData.password = await bcrypt.hash(userData.password, salt);
      users.push(userData);
    }

    const createdUsers = await User.insertMany(users);
    console.log('Sample users created');

    // Create subjects
    const createdSubjects = await Subject.insertMany(sampleSubjects);
    console.log('Sample subjects created');

    // Create sample notes
    const sampleNotes = [
      {
        title: 'Introduction to Binary Trees',
        description: 'Comprehensive notes on binary tree data structure, including implementation and common operations.',
        content: 'Binary trees are hierarchical data structures...',
        subject: createdSubjects[0]._id, // Data Structures
        author: createdUsers[0]._id, // Dr. John Smith
        tags: ['trees', 'recursion', 'data-structures'],
        difficulty: 'intermediate',
        type: 'lecture',
        semester: 3,
        year: 2,
        university: 'Tech University',
        professor: 'Dr. John Smith',
        rating: 4.8,
        ratingsCount: 25,
        views: 156,
        downloads: 89,
        isFeatured: true
      },
      {
        title: 'SQL Basics and Query Optimization',
        description: 'Essential SQL commands and techniques for optimizing database queries.',
        content: 'Structured Query Language (SQL) is...',
        subject: createdSubjects[1]._id, // Database Management
        author: createdUsers[1]._id, // Jane Doe
        tags: ['sql', 'database', 'optimization'],
        difficulty: 'beginner',
        type: 'summary',
        semester: 5,
        year: 3,
        university: 'Tech University',
        rating: 4.6,
        ratingsCount: 18,
        views: 203,
        downloads: 124,
        isFeatured: true
      },
      {
        title: 'React Hooks and State Management',
        description: 'Modern React development using hooks and context for state management.',
        content: 'React Hooks were introduced in version 16.8...',
        subject: createdSubjects[2]._id, // Web Development
        author: createdUsers[0]._id, // Dr. John Smith
        tags: ['react', 'hooks', 'javascript', 'frontend'],
        difficulty: 'advanced',
        type: 'project',
        semester: 7,
        year: 4,
        university: 'Tech University',
        professor: 'Prof. Mike Wilson',
        rating: 4.9,
        ratingsCount: 42,
        views: 387,
        downloads: 201,
        isFeatured: true
      }
    ];

    const createdNotes = await Note.insertMany(sampleNotes);
    console.log('Sample notes created');

    // Update user uploadedNotes
    await User.findByIdAndUpdate(createdUsers[0]._id, {
      $push: { uploadedNotes: { $each: [createdNotes[0]._id, createdNotes[2]._id] } }
    });

    await User.findByIdAndUpdate(createdUsers[1]._id, {
      $push: { uploadedNotes: createdNotes[1]._id }
    });

    // Update subject notes count
    for (const subject of createdSubjects) {
      await subject.updateNotesCount();
    }

    console.log('✅ Database seeded successfully!');
    console.log('\nSample login credentials:');
    console.log('Teacher: john.smith@university.edu / password123');
    console.log('Student: jane.doe@student.edu / password123');
    console.log('Admin: admin@notesfinder.com / admin123');

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run seeder
connectDB().then(() => {
  seedData();
});
