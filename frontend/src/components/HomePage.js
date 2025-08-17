import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaStar, FaDownload, FaBook } from 'react-icons/fa';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // In a real app, this would navigate to a search results page
      console.log('Searching for:', searchTerm);
      alert(`Searching for: "${searchTerm}". In a real app, this would show search results.`);
    }
  };

  const featuredNotes = [
    {
      id: 1,
      title: 'Advanced Calculus Notes',
      subject: 'Mathematics',
      author: 'Dr. Smith',
      rating: 4.9,
      downloads: 1234,
      preview: 'Comprehensive coverage of limits, derivatives, and integrals...'
    },
    {
      id: 2,
      title: 'React Development Guide',
      subject: 'Computer Science',
      author: 'Jane Developer',
      rating: 4.8,
      downloads: 956,
      preview: 'Complete guide to building modern React applications...'
    },
    {
      id: 3,
      title: 'Organic Chemistry Essentials',
      subject: 'Chemistry',
      author: 'Prof. Johnson',
      rating: 4.7,
      downloads: 789,
      preview: 'Understanding molecular structures and reaction mechanisms...'
    }
  ];

  const popularSubjects = [
    { name: 'Mathematics', count: 1205, color: 'bg-blue-500', icon: '📐' },
    { name: 'Physics', count: 890, color: 'bg-green-500', icon: '⚛️' },
    { name: 'Computer Science', count: 1456, color: 'bg-purple-500', icon: '💻' },
    { name: 'Literature', count: 634, color: 'bg-yellow-500', icon: '📚' },
    { name: 'History', count: 723, color: 'bg-red-500', icon: '🏛️' },
    { name: 'Biology', count: 567, color: 'bg-indigo-500', icon: '🧬' }
  ];

  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    if (rating % 1 !== 0) {
      stars.push(<FaStar key="half" className="text-yellow-200" />);
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg p-8 mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to NoteMate</h1>
          <p className="text-xl mb-6 text-blue-100">Find, share, and discover study notes from students worldwide</p>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex bg-white rounded-lg overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder="Search for notes, subjects, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow px-6 py-4 text-gray-800 focus:outline-none text-lg"
              />
              <button 
                type="submit"
                className="bg-blue-600 text-white px-8 py-4 hover:bg-blue-700 transition-colors"
              >
                <FaSearch className="text-xl" />
              </button>
            </div>
          </form>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold">5,000+</div>
            <div className="text-blue-100">Study Notes</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold">50,000+</div>
            <div className="text-blue-100">Downloads</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold">2,500+</div>
            <div className="text-blue-100">Students</div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Notes */}
        <section className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaStar className="text-yellow-500 mr-2" />
              Featured Notes
            </h2>
            <div className="space-y-6">
              {featuredNotes.map((note) => (
                <div key={note.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        <Link to={`/notes/${note.id}`} className="hover:text-blue-600">
                          {note.title}
                        </Link>
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 space-x-4 mb-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{note.subject}</span>
                        <span>by {note.author}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        {renderStarRating(note.rating)}
                        <span className="ml-1 text-sm text-gray-600">({note.rating})</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaDownload className="mr-1" />
                        {note.downloads}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{note.preview}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link 
                to="/subjects" 
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse All Notes
              </Link>
            </div>
          </div>
        </section>

        {/* Popular Subjects */}
        <section>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <FaBook className="text-blue-500 mr-2" />
              Popular Subjects
            </h2>
            <div className="space-y-3">
              {popularSubjects.map((subject, index) => (
                <Link 
                  key={index} 
                  to={`/subjects/${index + 1}`}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="text-2xl mr-3">{subject.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 group-hover:text-blue-600">
                      {subject.name}
                    </div>
                    <div className="text-sm text-gray-500">{subject.count} notes</div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${subject.color}`}></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-green-500 to-blue-600 text-white rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Share Your Knowledge</h3>
            <p className="mb-4 text-green-100">
              Help fellow students by uploading your study notes and earn recognition in the community.
            </p>
            <Link 
              to="/upload" 
              className="inline-block bg-white text-green-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Upload Notes
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;