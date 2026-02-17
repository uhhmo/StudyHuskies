import React, { useState } from 'react';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [newCourseName, setNewCourseName] = useState('');
  const [showInput, setShowInput] = useState(false);

  const addCourse = () => {
    if (newCourseName.trim() === '') {
      alert('Please enter a course name');
      return;
    }

    const newCourse = {
      id: Date.now(),
      name: newCourseName,
      flashcardSets: []
    };

    setCourses([...courses, newCourse]);
    setNewCourseName('');
    setShowInput(false);
  };

  return (
    <div>
      <h1>My Courses</h1>
      
      <div className="add-course">
        {!showInput ? (
          <button onClick={() => setShowInput(true)}>Add Course</button>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Enter course name"
              value={newCourseName}
              onChange={(e) => setNewCourseName(e.target.value)}
              autoFocus
            />
            <button onClick={addCourse}>Add</button>
            <button onClick={() => setShowInput(false)}>Cancel</button>
          </div>
        )}
      </div>

      <div className="courses-list">
        {courses.length === 0 ? (
          <p>Get started by creating your first course!</p>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="course-card">
              <h2>{course.name}</h2>
              <p>{course.flashcardSets.length} flashcard set(s)</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Courses;