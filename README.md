# Notes Finder - Full Stack Application

A comprehensive notes sharing platform for students and teachers, built with React.js frontend and Express.js backend with MongoDB database.

## 🚀 Features

- **User Authentication**: Register, login, password reset
- **Role-based Access**: Student, Teacher, and Admin roles
- **Notes Management**: Upload, view, download, rate and comment on notes
- **Subject Organization**: Browse notes by subjects and categories
- **File Upload**: Support for multiple file formats
- **Search & Filter**: Advanced search with filters
- **User Profiles**: Personal profiles with uploaded notes
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router v6
- Tailwind CSS
- React Icons
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing
- Multer for file uploads
- Express Validator

## 📋 Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (locally or MongoDB Atlas)
- npm or yarn

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd Notes-Finder
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 4. Environment Configuration

Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notes_finder
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=30d
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5000000
```

### 5. Start MongoDB

Make sure MongoDB is running on your system:
```bash
# If using local MongoDB
mongod

# Or if using MongoDB as a service
sudo systemctl start mongod
```

### 6. Seed the Database (Optional)

To add sample data to your database:
```bash
cd backend
node seeder.js
```

This will create sample users, subjects, and notes. Login credentials:
- **Teacher**: john.smith@university.edu / password123
- **Student**: jane.doe@student.edu / password123
- **Admin**: admin@notesfinder.com / admin123

## 🏃‍♂️ Running the Application

### Option 1: Run Both Frontend and Backend Together
```bash
npm run dev
```

### Option 2: Run Separately

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
Notes-Finder/
├── frontend/             # React frontend application
│   ├── public/          # Public assets
│   ├── src/             # Frontend source code
│   │   ├── components/  # React components
│   │   ├── services/    # API services
│   │   ├── App.js      # Main App component
│   │   └── index.js    # Entry point
│   ├── .env            # Frontend environment variables
│   ├── package.json    # Frontend dependencies
│   └── README.md       # Frontend documentation
├── backend/             # Express.js backend application
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── .env           # Backend environment variables
│   ├── seeder.js      # Database seeder
│   ├── server.js      # Entry point
│   └── package.json   # Backend dependencies
├── .env                # Main environment variables
└── README.md          # Main documentation
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Notes
- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get single note
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note
- `GET /api/notes/featured` - Get featured notes

### Subjects
- `GET /api/subjects` - Get all subjects
- `GET /api/subjects/:id` - Get single subject
- `POST /api/subjects` - Create subject (Teacher/Admin)
- `PUT /api/subjects/:id` - Update subject (Teacher/Admin)
- `GET /api/subjects/:id/notes` - Get notes for subject

### Users
- `GET /api/users/:id` - Get user profile
- `GET /api/users/:id/notes` - Get user's notes

## 🔒 Authentication & Authorization

The application uses JWT-based authentication with role-based access control:

- **Public**: View notes and subjects
- **Students**: Upload notes, comment, rate
- **Teachers**: All student privileges + create subjects
- **Admins**: All privileges + user management

## 📦 Database Models

### User Model
- Personal information (name, email, university, course)
- Authentication (password, role)
- Profile data (bio, avatar, reputation)
- Relationships (uploaded notes, saved notes)

### Subject Model
- Subject details (name, code, department)
- Academic info (credits, semester, year)
- Metadata (difficulty, tags, prerequisites)

### Note Model
- Content (title, description, files)
- Academic context (subject, semester, type)
- Interactions (ratings, comments, likes)
- Metadata (views, downloads, tags)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the MONGODB_URI in .env file

2. **Port Already in Use**
   - Change the PORT in .env file
   - Kill the process using the port: `lsof -ti:5000 | xargs kill`

3. **Module Not Found Errors**
   - Delete node_modules and package-lock.json
   - Run `npm install` again

### Environment Variables

Make sure all required environment variables are set in your `.env` file:
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Backend server port (default: 5000)

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information

---

**Happy Coding! 🚀**