import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import HomePage from './components/HomePage';
import UploadNotesPage from './components/UploadNotesPage';
import MyNotesPage from './components/MyNotesPage';
import SubjectsPage from './components/SubjectsPage';
import ProfilePage from './components/ProfilePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600 mr-10">NoteMate</Link>
              <nav>
                <ul className="flex space-x-4">
                  <li><Link to="/" className="text-gray-600  hover:text-blue-600">Home</Link></li>
                  <li><Link to="/upload" className="text-gray-600 hover:text-blue-600">Upload Notes</Link></li>
                  <li><Link to="/my-notes" className="text-gray-600 hover:text-blue-600">My Notes</Link></li>
                  <li><Link to="/subjects" className="text-gray-600 hover:text-blue-600">Subjects</Link></li>
                </ul>
              </nav>
            </div>
            <div>
              <Link to="/profile" className="text-gray-600 hover:text-blue-600">
                <FaUser className="inline-block" />
                <span className="ml-1">Profile</span>
              </Link>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadNotesPage />} />
          <Route path="/my-notes" element={<MyNotesPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
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