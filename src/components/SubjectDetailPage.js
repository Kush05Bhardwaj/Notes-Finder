import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaSort, FaDownload, FaHeart, FaCalendarAlt } from 'react-icons/fa';

function SubjectDetailPage() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');
  
  // Mock data - in a real app, this would come from an API
  const subjects = {
    1: 'Mathematics',
    2: 'Physics', 
    3: 'Computer Science',
    4: 'Literature',
    5: 'History',
    6: 'Biology',
    7: 'Chemistry',
    8: 'Economics'
  };

  const subjectName = subjects[id] || 'Unknown Subject';

  // Mock notes data
  const notes = [
    {
      id: 1,
      title: 'Calculus Fundamentals',
      author: 'John Doe',
      date: '2023-05-15',
      downloads: 245,
      likes: 89,
      rating: 4.8,
      fileSize: '2.4 MB',
      pages: 45,
      description: 'Comprehensive notes covering differential and integral calculus...'
    },
    {
      id: 2,
      title: 'Linear Algebra Basics',
      author: 'Jane Smith',
      date: '2023-06-01',
      downloads: 156,
      likes: 67,
      rating: 4.6,
      fileSize: '1.8 MB',
      pages: 32,
      description: 'Essential concepts in linear algebra including matrices and vectors...'
    },
    {
      id: 3,
      title: 'Statistics and Probability',
      author: 'Mike Johnson',
      date: '2023-05-28',
      downloads: 198,
      likes: 78,
      rating: 4.7,
      fileSize: '3.1 MB',
      pages: 58,
      description: 'Complete guide to statistical analysis and probability theory...'
    },
    {
      id: 4,
      title: 'Discrete Mathematics',
      author: 'Sarah Wilson',
      date: '2023-06-10',
      downloads: 134,
      likes: 45,
      rating: 4.5,
      fileSize: '2.7 MB',
      pages: 41,
      description: 'Logical reasoning, set theory, and combinatorics...'
    }
  ];

  // Filter and sort notes
  const filteredNotes = notes
    .filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(note => filterRating === 'all' || note.rating >= parseFloat(filterRating))
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'popular':
          return b.downloads - a.downloads;
        case 'liked':
          return b.likes - a.likes;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
      stars.push(<span key={i} className="text-gray-300">★</span>);
    }
    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{subjectName} Notes</h1>
            <p className="text-gray-600">Browse and download notes for {subjectName}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{filteredNotes.length}</div>
            <div className="text-gray-600">Available Notes</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Downloaded</option>
              <option value="liked">Most Liked</option>
              <option value="rating">Highest Rated</option>
            </select>
            
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Ratings</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <div key={note.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800 flex-1 mr-2">{note.title}</h3>
                <div className="text-right text-sm text-gray-500">
                  <div className="flex items-center">
                    {renderStarRating(note.rating)}
                    <span className="ml-1">({note.rating})</span>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 mb-3">
                <div className="flex items-center mb-1">
                  <span className="font-medium">By: {note.author}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  <span>{note.date}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{note.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-3">
                  <span>{note.downloads} downloads</span>
                  <span>{note.likes} likes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>{note.pages} pages</span>
                  <span>•</span>
                  <span>{note.fileSize}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Link 
                  to={`/notes/${note.id}`}
                  className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <FaDownload />
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                  <FaHeart />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No notes found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
}

export default SubjectDetailPage;
