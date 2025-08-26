# Deployment Guide

This guide covers various deployment options for the Notes Finder application.

## 🚀 Quick Deployment Options

### 1. Docker Deployment (Recommended)

#### Development
```bash
# Clone and setup
git clone <repository-url>
cd Notes-Finder
cp .env.example .env
cp frontend/.env.example frontend/.env

# Update environment variables in .env files

# Run with Docker Compose
docker-compose up --build
```

#### Production
```bash
# Use production environment
cp .env.production .env
cp frontend/.env.production frontend/.env

# Update environment variables with production values

# Deploy with production compose
docker-compose -f docker-compose.prod.yml up --build -d
```

### 2. Vercel Deployment

#### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `REACT_APP_API_URL`: Your backend URL
3. Deploy automatically on push to main branch

#### Backend (Vercel Serverless)
1. Deploy backend as separate Vercel project
2. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRE`
   - `MAX_FILE_SIZE`
   - `FRONTEND_URL`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

### 3. Heroku Deployment

#### Backend
```bash
# Install Heroku CLI and login
heroku login

# Create Heroku app
heroku create notes-finder-backend

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set FRONTEND_URL=https://your-frontend-domain.com

# Deploy
git subtree push --prefix=backend heroku main
```

#### Frontend
```bash
# Create frontend app
heroku create notes-finder-frontend

# Set buildpack
heroku buildpacks:set https://github.com/mars/create-react-app-buildpack.git

# Set environment variables
heroku config:set REACT_APP_API_URL=https://your-backend-domain.com

# Deploy
git subtree push --prefix=frontend heroku main
```

### 4. Digital Ocean / AWS / GCP

Use the provided Dockerfiles with any container hosting service:

1. Build and push images to container registry
2. Set environment variables in hosting platform
3. Deploy containers with proper networking

## 🔧 Environment Variables Setup

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_super_secure_jwt_secret_32_chars_minimum
JWT_EXPIRE=30d
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5000000
FRONTEND_URL=https://your-frontend-domain.com
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (.env.production)
```env
REACT_APP_API_URL=https://your-backend-domain.com
REACT_APP_ENV=production
GENERATE_SOURCEMAP=false
```

## 🔒 Security Checklist

- [ ] Update JWT_SECRET to a strong, random string (32+ characters)
- [ ] Use production MongoDB database
- [ ] Set up proper CORS origins
- [ ] Enable HTTPS in production
- [ ] Remove .env files from git tracking
- [ ] Set up proper file upload limits
- [ ] Configure Cloudinary for file storage
- [ ] Enable security headers
- [ ] Set up monitoring and logging

## 📊 Monitoring

Add these environment variables for monitoring:
- `SENTRY_DSN` for error tracking
- `LOG_LEVEL` for logging level
- `MONITOR_URL` for health checks

## 🔄 CI/CD Pipeline

Create `.github/workflows/deploy.yml` for automated deployment:

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to production
        # Add your deployment steps here
```

## 🆘 Troubleshooting

### Common Issues:
1. **CORS errors**: Check FRONTEND_URL in backend .env
2. **Database connection**: Verify MONGODB_URI
3. **JWT errors**: Ensure JWT_SECRET is set and strong
4. **File upload issues**: Check MAX_FILE_SIZE and Cloudinary config
5. **Build failures**: Verify all dependencies are listed in package.json

### Health Checks:
- Backend: `https://your-backend-domain.com/api/health`
- Frontend: Check if app loads and can make API calls

For more detailed troubleshooting, check the application logs in your deployment platform.
