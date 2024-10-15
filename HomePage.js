import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Notes Finder</h1>
        <p className="text-gray-600 mb-4">Find and share study notes with ease!</p>
        <div className="flex">
          <input
            type="text"
            placeholder="Search Notes"
            className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
            <FaSearch className="inline-block" />
          </button>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Trending Notes</h2>
        <ul className="space-y-2">
          {['Mathematics', 'Physics', 'Computer Science', 'Literature', 'History'].map((subject, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded-md hover:bg-gray-200 cursor-pointer">
              <Link to={`/subjects/${subject.toLowerCase().replace(' ', '-')}`}>
                {subject} Notes
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default HomePage;