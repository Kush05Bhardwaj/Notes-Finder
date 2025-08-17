# Notes Finder - Quick Setup Guide

## Prerequisites Installation

### 1. Install MongoDB Community Edition

**For Windows:**

1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer with default settings
3. Add MongoDB to your PATH environment variable:
   - Add `C:\Program Files\MongoDB\Server\[version]\bin` to your PATH
4. Start MongoDB:
   ```cmd
   mongod
   ```

**Alternative - Using MongoDB Atlas (Cloud):**
1. Create a free account at https://cloud.mongodb.com/
2. Create a new cluster
3. Get your connection string
4. Update the MONGODB_URI in `.env` file with your Atlas connection string

### 2. Install Node.js
- Download and install Node.js (v16+) from: https://nodejs.org/

## Quick Start

### 1. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
npm run install-backend
```

### 2. Start MongoDB (if using local)
```bash
mongod
```

### 3. Seed Database (Optional)
```bash
npm run seed
```

### 4. Start Application
```bash
# Start both frontend and backend
npm run dev
```

Or start them separately:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
npm start
```

### 5. Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Demo Accounts (after seeding)
- **Teacher**: john.smith@university.edu / password123
- **Student**: jane.doe@student.edu / password123  
- **Admin**: admin@notesfinder.com / admin123

## API Testing
Test the API health endpoint:
```bash
curl http://localhost:5000/api/health
```

## Troubleshooting

### MongoDB Connection Issues
1. Make sure MongoDB is running: `mongod`
2. Check the MONGODB_URI in `.env` files
3. Ensure MongoDB service is started

### Port Issues
- Change PORT in `.env` if 5000 is occupied
- Frontend proxy is configured to work with backend on port 5000

### Module Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
cd backend
rm -rf node_modules package-lock.json  
npm install
```
