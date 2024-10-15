import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

function UploadNotesPage() {
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Uploading:', { file, subject, title });
    setFile(null);
    setSubject('');
    setTitle('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Upload Notes</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">Subject</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="file-upload" className="block text-gray-700 font-bold mb-2">File</label>
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            className="hidden"
            required
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 inline-flex items-center"
          >
            <FaUpload className="mr-2" />
            {file ? file.name : 'Choose a file'}
          </label>
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          Upload Notes
        </button>
      </form>
    </div>
  );
}

export default UploadNotesPage;