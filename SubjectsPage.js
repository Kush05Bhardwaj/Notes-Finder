import React from 'react';
import { Link } from 'react-router-dom';

function SubjectsPage() {
  const subjects = [
    { id: 1, name: 'Mathematics', count: 150 },
    { id: 2, name: 'Physics', count: 120 },
    { id: 3, name: 'Computer Science', count: 200 },
    { id: 4, name: 'Literature', count: 80 },
    { id: 5, name: 'History', count: 100 },
    { id: 6, name: 'Biology', count: 90 },
    { id: 7, name: 'Chemistry', count: 110 },
    { id: 8, name: 'Economics', count: 70 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Subjects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subjects.map((subject) => (
          <Link key={subject.id} to={`/subjects/${subject.id}`}>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{subject.name}</h2>
              <p className="text-gray-600">{subject.count} notes</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SubjectsPage;