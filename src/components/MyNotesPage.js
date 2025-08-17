import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaDownload, FaTrash, FaEdit, FaEye, FaHeart, FaShare, FaSearch } from 'react-icons/fa';

function MyNotesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [myNotes, setMyNotes] = useState([
    { 
      id: 1, 
      title: 'Calculus Fundamentals', 
      subject: 'Mathematics', 
      date: '2023-05-15',
      status: 'published',
      downloads: 245,
      likes: 89,
      views: 1250,
      fileSize: '2.4 MB'
    },
    { 
      id: 2, 
      title: 'Introduction to React', 
      subject: 'Computer Science', 
      date: '2023-06-02',
      status: 'pending',
      downloads: 0,
      likes: 0,
      views: 0,
      fileSize: '1.8 MB'
    },
    { 
      id: 3, 
      title: 'World War II Overview', 
      subject: 'History', 
      date: '2023-06-10',
      status: 'published',
      downloads: 156,
      likes: 67,
      views: 892,
      fileSize: '3.1 MB'
    },
    { 
      id: 4, 
      title: 'Organic Chemistry Basics', 
      subject: 'Chemistry', 
      date: '2023-06-15',
      status: 'draft',
      downloads: 0,
      likes: 0,
      views: 0,
      fileSize: '2.7 MB'
    },
  ]);

  const handleDelete = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
      setMyNotes(myNotes.filter(note => note.id !== noteId));
    }
  };

  const handleShare = (note) => {
    const shareUrl = `${window.location.origin}/notes/${note.id}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard!');
  };

  // Filter notes based on search and status
  const filteredNotes = myNotes
    .filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(note => filterStatus === 'all' || note.status === filterStatus);

  const getStatusBadge = (status) => {
    const statusStyles = {
      published: 'bg-green-100 text-green-800 border border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      draft: 'bg-gray-100 text-gray-800 border border-gray-200',
      rejected: 'bg-red-100 text-red-800 border border-red-200'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || statusStyles.draft}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTotalStats = () => {
    return {
      totalNotes: myNotes.length,
      totalDownloads: myNotes.reduce((sum, note) => sum + note.downloads, 0),
      totalLikes: myNotes.reduce((sum, note) => sum + note.likes, 0),
      totalViews: myNotes.reduce((sum, note) => sum + note.views, 0)
    };
  };

  const stats = getTotalStats();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Notes</h1>
          <p className="text-gray-600">Manage your uploaded notes and track their performance</p>
        </div>
        <Link 
          to="/upload"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Upload New Note
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">{stats.totalNotes}</div>
          <div className="text-gray-600">Total Notes</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">{stats.totalDownloads}</div>
          <div className="text-gray-600">Total Downloads</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-2xl font-bold text-red-600 mb-2">{stats.totalLikes}</div>
          <div className="text-gray-600">Total Likes</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-2">{stats.totalViews}</div>
          <div className="text-gray-600">Total Views</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search your notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="pending">Pending Review</option>
            <option value="draft">Draft</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Notes Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNotes.map((note) => (
                <tr key={note.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{note.title}</div>
                      <div className="text-sm text-gray-600">{note.subject}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Uploaded: {note.date} • {note.fileSize}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(note.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center text-gray-600 space-x-4">
                        <span className="flex items-center">
                          <FaEye className="mr-1 text-blue-500" />
                          {note.views}
                        </span>
                        <span className="flex items-center">
                          <FaDownload className="mr-1 text-green-500" />
                          {note.downloads}
                        </span>
                        <span className="flex items-center">
                          <FaHeart className="mr-1 text-red-500" />
                          {note.likes}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Link 
                        to={`/notes/${note.id}`}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="View Note"
                      >
                        <FaEye />
                      </Link>
                      <button 
                        onClick={() => alert('Edit functionality would open an edit form')}
                        className="text-yellow-600 hover:text-yellow-900 p-1 rounded"
                        title="Edit Note"
                      >
                        <FaEdit />
                      </button>
                      {note.status === 'published' && (
                        <button 
                          onClick={() => handleShare(note)}
                          className="text-green-600 hover:text-green-900 p-1 rounded"
                          title="Share Note"
                        >
                          <FaShare />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(note.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Delete Note"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No notes found</h3>
            <p className="text-gray-600 mb-4">
              {myNotes.length === 0 
                ? "You haven't uploaded any notes yet." 
                : "No notes match your current search or filter."
              }
            </p>
            {myNotes.length === 0 && (
              <Link 
                to="/upload"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upload Your First Note
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Status Legend */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-2">Status Guide:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
          <div className="flex items-center">
            {getStatusBadge('published')}
            <span className="ml-2 text-gray-600">Publicly available</span>
          </div>
          <div className="flex items-center">
            {getStatusBadge('pending')}
            <span className="ml-2 text-gray-600">Under review</span>
          </div>
          <div className="flex items-center">
            {getStatusBadge('draft')}
            <span className="ml-2 text-gray-600">Not yet submitted</span>
          </div>
          <div className="flex items-center">
            {getStatusBadge('rejected')}
            <span className="ml-2 text-gray-600">Needs revision</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyNotesPage;