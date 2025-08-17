import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaDownload, FaHeart, FaShare, FaUser, FaCalendarAlt } from 'react-icons/fa';

function NoteDetailPage() {
  const { id } = useParams();
  
  // Mock data - in a real app, this would come from an API
  const note = {
    id: parseInt(id),
    title: 'Calculus Fundamentals',
    subject: 'Mathematics',
    author: 'John Doe',
    date: '2023-05-15',
    downloads: 245,
    likes: 89,
    description: 'Comprehensive notes covering differential and integral calculus, including limits, derivatives, and applications.',
    fileSize: '2.4 MB',
    pages: 45,
    tags: ['calculus', 'mathematics', 'derivatives', 'integrals'],
    preview: [
      'Chapter 1: Introduction to Limits',
      'Chapter 2: Derivatives and Applications',
      'Chapter 3: Integration Techniques',
      'Chapter 4: Applications of Integration'
    ]
  };

  const handleDownload = () => {
    console.log(`Downloading note ${id}`);
    // In a real app, this would trigger a file download
    alert('Download started!');
  };

  const handleLike = () => {
    console.log(`Liked note ${id}`);
    // In a real app, this would update the like count
  };

  const handleShare = () => {
    console.log(`Sharing note ${id}`);
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <h1 className="text-3xl font-bold mb-2">{note.title}</h1>
          <div className="flex items-center text-blue-100 space-x-4">
            <div className="flex items-center">
              <FaUser className="mr-1" />
              <span>{note.author}</span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-1" />
              <span>{note.date}</span>
            </div>
            <div className="bg-blue-400 px-3 py-1 rounded-full text-sm">
              {note.subject}
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Stats */}
          <div className="flex items-center justify-between mb-6 bg-gray-50 p-4 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{note.downloads}</div>
              <div className="text-gray-600">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{note.likes}</div>
              <div className="text-gray-600">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{note.pages}</div>
              <div className="text-gray-600">Pages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{note.fileSize}</div>
              <div className="text-gray-600">Size</div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
            <p className="text-gray-600 leading-relaxed">{note.description}</p>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content Preview */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Content Overview</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {note.preview.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleDownload}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <FaDownload className="mr-2" />
              Download Notes
            </button>
            <button
              onClick={handleLike}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center"
            >
              <FaHeart className="mr-2" />
              Like
            </button>
            <button
              onClick={handleShare}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            >
              <FaShare className="mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Related Notes */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Related Notes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((relatedId) => (
            <Link key={relatedId} to={`/notes/${relatedId + 10}`}>
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-gray-800 mb-2">Advanced Calculus {relatedId}</h4>
                <p className="text-gray-600 text-sm mb-2">Mathematics</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>150 downloads</span>
                  <span>2.1 MB</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NoteDetailPage;
