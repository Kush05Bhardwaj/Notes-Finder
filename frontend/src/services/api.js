import axios from 'axios';

// Create axios instance
const getBaseURL = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_URL || 'https://your-backend-domain.com/api';
  }
  
  // In development, use the proxy or explicit URL
  if (process.env.REACT_APP_API_URL) {
    return `${process.env.REACT_APP_API_URL}/api`;
  }
  
  // Use proxy in development (remove /api since proxy handles it)
  return '/api';
};

const API = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔗 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    }
    
    return config;
  },
  (error) => {
    console.error('🚨 Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
API.interceptors.response.use(
  (response) => {
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);
    }
    return response.data;
  },
  (error) => {
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`❌ API Error: ${error.response?.status || 'Network'} ${error.config?.method?.toUpperCase()} ${error.config?.url}`, error.response?.data || error.message);
    }
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => API.post('/auth/register', userData),
  login: (credentials) => API.post('/auth/login', credentials),
  getMe: () => API.get('/auth/me'),
  updateProfile: (profileData) => API.put('/auth/profile', profileData),
  changePassword: (passwordData) => API.put('/auth/change-password', passwordData),
  forgotPassword: (email) => API.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => API.put(`/auth/reset-password/${token}`, { password }),
  logout: () => API.post('/auth/logout')
};

// Notes API
export const notesAPI = {
  getNotes: (params = {}) => API.get('/notes', { params }),
  getNote: (id) => API.get(`/notes/${id}`),
  createNote: (noteData) => API.post('/notes', noteData),
  updateNote: (id, noteData) => API.put(`/notes/${id}`, noteData),
  deleteNote: (id) => API.delete(`/notes/${id}`),
  uploadFiles: (id, formData) => API.post(`/notes/${id}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  downloadFile: (noteId, fileId) => API.get(`/notes/${noteId}/download/${fileId}`, {
    responseType: 'blob'
  }),
  rateNote: (id, ratingData) => API.post(`/notes/${id}/rate`, ratingData),
  likeNote: (id) => API.post(`/notes/${id}/like`),
  unlikeNote: (id) => API.delete(`/notes/${id}/like`),
  addComment: (id, commentData) => API.post(`/notes/${id}/comments`, commentData),
  updateComment: (noteId, commentId, commentData) => 
    API.put(`/notes/${noteId}/comments/${commentId}`, commentData),
  deleteComment: (noteId, commentId) => API.delete(`/notes/${noteId}/comments/${commentId}`),
  addReply: (noteId, commentId, replyData) => 
    API.post(`/notes/${noteId}/comments/${commentId}/replies`, replyData),
  reportNote: (id, reportData) => API.post(`/notes/${id}/report`, reportData),
  getFeaturedNotes: () => API.get('/notes/featured'),
  getMyNotes: (params = {}) => API.get('/notes/user/my-notes', { params }),
  searchNotes: (params = {}) => API.get('/notes/search', { params })
};

// Subjects API
export const subjectsAPI = {
  getSubjects: (params = {}) => API.get('/subjects', { params }),
  getSubject: (id) => API.get(`/subjects/${id}`),
  createSubject: (subjectData) => API.post('/subjects', subjectData),
  updateSubject: (id, subjectData) => API.put(`/subjects/${id}`, subjectData),
  deleteSubject: (id) => API.delete(`/subjects/${id}`),
  getSubjectNotes: (id, params = {}) => API.get(`/subjects/${id}/notes`, { params }),
  searchSubjects: (params = {}) => API.get('/subjects/search', { params })
};

// Users API
export const usersAPI = {
  getUsers: (params = {}) => API.get('/users', { params }),
  getUser: (id) => API.get(`/users/${id}`),
  updateUser: (id, userData) => API.put(`/users/${id}`, userData),
  deleteUser: (id) => API.delete(`/users/${id}`),
  getUserNotes: (id, params = {}) => API.get(`/users/${id}/notes`, { params }),
  getUserStats: (id) => API.get(`/users/${id}/stats`),
  followUser: (id) => API.post(`/users/${id}/follow`),
  unfollowUser: (id) => API.delete(`/users/${id}/follow`),
  getFollowers: (id) => API.get(`/users/${id}/followers`),
  getFollowing: (id) => API.get(`/users/${id}/following`)
};

// Health check
export const healthAPI = {
  check: () => API.get('/health')
};

export default API;
