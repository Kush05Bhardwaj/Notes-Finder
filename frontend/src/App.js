import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import HomePage from './components/HomePage';
import UploadNotesPage from './components/UploadNotesPage';
import MyNotesPage from './components/MyNotesPage';
import SubjectsPage from './components/SubjectsPage';
import SubjectDetailPage from './components/SubjectDetailPage';
import NoteDetailPage from './components/NoteDetailPage';
import ProfilePage from './components/ProfilePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import './App.css';

function App() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600 mr-10">NoteMate</Link>
              <nav>
                <ul className="flex space-x-4">
                  <li><Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link></li>
                  {isLoggedIn && (
                    <>
                      <li><Link to="/upload" className="text-gray-600 hover:text-blue-600">Upload Notes</Link></li>
                      <li><Link to="/my-notes" className="text-gray-600 hover:text-blue-600">My Notes</Link></li>
                    </>
                  )}
                  <li><Link to="/subjects" className="text-gray-600 hover:text-blue-600">Subjects</Link></li>
                </ul>
              </nav>
            </div>
            <div>
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                  <Link to="/profile" className="text-gray-600 hover:text-blue-600">
                    <FaUser className="inline-block" />
                    <span className="ml-1">Profile</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-blue-600 text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
                  <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/upload" element={<UploadNotesPage />} />
          <Route path="/my-notes" element={<MyNotesPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/subjects/:id" element={<SubjectDetailPage />} />
          <Route path="/notes/:id" element={<NoteDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>

        <footer className="bg-white border-t mt-8">
          <div className="container mx-auto px-4 py-6 text-center text-gray-600">
            © 2024 Notes Finder. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;