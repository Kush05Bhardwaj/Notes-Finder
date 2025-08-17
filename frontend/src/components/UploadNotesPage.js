import React, { useState } from 'react';
import { FaUpload, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

function UploadNotesPage() {
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const subjects = [
    'Mathematics',
    'Physics', 
    'Computer Science',
    'Literature',
    'History',
    'Biology',
    'Chemistry',
    'Economics',
    'Other'
  ];

  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Auto-generate title from filename if not already set
      if (!title && selectedFile) {
        const fileName = selectedFile.name.replace(/\.[^/.]+$/, ""); // Remove extension
        setTitle(fileName.replace(/[-_]/g, ' ')); // Replace hyphens and underscores with spaces
      }
    }
  };

  const validateForm = () => {
    if (!title.trim()) return 'Title is required';
    if (!subject) return 'Subject is required';
    if (!description.trim()) return 'Description is required';
    if (!file) return 'Please select a file to upload';
    
    // File size check (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return 'File size must be less than 10MB';
    }
    
    // File type check
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      return 'Only PDF and Word documents are allowed';
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      setUploadStatus({ type: 'error', message: error });
      return;
    }
    
    setUploading(true);
    setUploadStatus(null);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Uploading:', { 
        file, 
        subject, 
        title, 
        description, 
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        isPublic 
      });
      
      setUploadStatus({ 
        type: 'success', 
        message: 'Notes uploaded successfully! They will be reviewed before being published.' 
      });
      
      // Reset form
      setFile(null);
      setSubject('');
      setTitle('');
      setDescription('');
      setTags('');
      setIsPublic(true);
      
    } catch (error) {
      setUploadStatus({ 
        type: 'error', 
        message: 'Upload failed. Please try again.' 
      });
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Upload Notes</h1>
        
        {uploadStatus && (
          <div className={`mb-6 p-4 rounded-lg flex items-center ${
            uploadStatus.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {uploadStatus.type === 'success' ? (
              <FaCheck className="mr-3 text-green-600" />
            ) : (
              <FaExclamationTriangle className="mr-3 text-red-600" />
            )}
            {uploadStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a descriptive title for your notes"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">
              Subject *
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a subject</option>
              {subjects.map((subj, index) => (
                <option key={index} value={subj}>{subj}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Description *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what your notes cover, topics included, etc."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">
              Tags (optional)
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags separated by commas (e.g., calculus, derivatives, limits)"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">Tags help others find your notes more easily</p>
          </div>

          <div className="mb-6">
            <label htmlFor="file-upload" className="block text-gray-700 font-bold mb-2">
              File *
            </label>
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="hidden"
              required
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 inline-flex items-center transition-colors"
            >
              <FaUpload className="mr-2" />
              {file ? 'Change File' : 'Choose a file'}
            </label>
            
            {file && (
              <div className="mt-3 p-3 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
                  </div>
                  <div className="text-green-600">
                    <FaCheck />
                  </div>
                </div>
              </div>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Accepted formats: PDF, DOC, DOCX (Max size: 10MB)
            </p>
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-700">Make this note publicly available</span>
            </label>
            <p className="text-sm text-gray-500 mt-1">
              {isPublic 
                ? 'Other users will be able to find and download your notes' 
                : 'Only you will be able to access these notes'
              }
            </p>
          </div>

          <button 
            type="submit" 
            disabled={uploading}
            className={`w-full py-3 rounded-md font-medium transition-colors ${
              uploading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            } text-white`}
          >
            {uploading ? (
              <>
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Uploading...
              </>
            ) : (
              'Upload Notes'
            )}
          </button>
        </form>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Upload Guidelines</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Ensure your notes are original or you have permission to share them</li>
            <li>• Use clear, descriptive titles and accurate subject categorization</li>
            <li>• Include relevant tags to help others discover your content</li>
            <li>• Files will be reviewed before being made publicly available</li>
            <li>• Inappropriate content will be removed</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UploadNotesPage;