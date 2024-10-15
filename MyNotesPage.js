import React from 'react';
import { Link } from 'react-router-dom';
import { FaDownload, FaTrash } from 'react-icons/fa';

function MyNotesPage() {
  const myNotes = [
    { id: 1, title: 'Calculus Fundamentals', subject: 'Mathematics', date: '2023-05-15' },
    { id: 2, title: 'Introduction to React', subject: 'Computer Science', date: '2023-06-02' },
    { id: 3, title: 'World War II Overview', subject: 'History', date: '2023-06-10' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Notes</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {myNotes.map((note) => (
              <tr key={note.id}>
                <td className="px-6 py-4 whitespace-nowrap">{note.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{note.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">{note.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/notes/${note.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                    <FaDownload className="inline-block" />
                  </Link>
                  <button className="text-red-600 hover:text-red-900">
                    <FaTrash className="inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyNotesPage;