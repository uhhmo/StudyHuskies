// ============================================================
// courses.jsx
// manages courses and the flashcard sets within each course.
// ============================================================

import React, { useState } from 'react';

function Courses({ courses, setCourses }) {

  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editCourseName, setEditCourseName] = useState('');
  const [addingSetForCourse, setAddingSetForCourse] = useState(null);
  const [newSetName, setNewSetName] = useState('');

  function addCourse() {
    if (!newCourseName.trim()) { alert('Please enter a course name'); return; }
    const newCourse = { id: Date.now(), name: newCourseName.trim(), flashcardSets: [] };
    setCourses([...courses, newCourse]);
    setNewCourseName('');
    setShowInput(false);
  }

  function deleteCourse(id) {
    if (!window.confirm('Delete this course and all its sets?')) return;
    setCourses(courses.filter(c => c.id !== id));
    if (expandedCourseId === id) setExpandedCourseId(null);
  }

  function saveCourseName(id) {
    if (!editCourseName.trim()) return;
    setCourses(courses.map(c => c.id === id ? { ...c, name: editCourseName.trim() } : c));
    setEditingCourseId(null);
  }

  function addSet(courseId) {
    if (!newSetName.trim()) return;
    const newSet = { id: Date.now(), name: newSetName.trim(), cards: [] };
    setCourses(courses.map(c =>
      c.id === courseId ? { ...c, flashcardSets: [...c.flashcardSets, newSet] } : c
    ));
    setNewSetName('');
    setAddingSetForCourse(null);
  }

  function deleteSet(courseId, setId) {
    setCourses(courses.map(c =>
      c.id === courseId
        ? { ...c, flashcardSets: c.flashcardSets.filter(s => s.id !== setId) }
        : c
    ));
  }

  return (
    <main>
      <h1 className="courses-header">My Courses</h1>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        {!showInput ? (
          <button className="btn-home" onClick={() => setShowInput(true)}>+ Add Course</button>
        ) : (
          <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              className="form-control"
              style={{ width: '220px' }}
              type="text"
              placeholder="e.g. MATH 124"
              value={newCourseName}
              onChange={e => setNewCourseName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addCourse()}
              autoFocus
            />
            <button className="btn-home" onClick={addCourse}>Add</button>
            <button className="btn-home" onClick={() => { setShowInput(false); setNewCourseName(''); }}>Cancel</button>
          </div>
        )}
      </div>

      <div className="courses-container">
        <section>
          <h2 className="courses-header">Select a course to view your flashcard sets!</h2>

          {courses.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>
              No courses yet — click "+ Add Course" to get started!
            </p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}>
              {courses.map(course => (
                <div key={course.id} style={{ width: "220px", flexShrink: 0 }}>
                  {editingCourseId === course.id ? (
                    <div className="course-card" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <input
                        className="form-control"
                        value={editCourseName}
                        onChange={e => setEditCourseName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && saveCourseName(course.id)}
                        autoFocus
                      />
                      <div className="button-row" style={{ marginTop: 0 }}>
                        <button
                          className="btn-home"
                          style={{ fontSize: '12px', padding: '4px 12px' }}
                          onClick={() => saveCourseName(course.id)}
                        >
                          Save
                        </button>
                        <button
                          style={{ fontSize: '12px', padding: '4px 10px' }}
                          onClick={() => setEditingCourseId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>

                  ) : (
                    <div
                      className="course-card"
                      style={{ cursor: 'pointer', marginBottom: '6px' }}
                      onClick={() => setExpandedCourseId(expandedCourseId === course.id ? null : course.id)}
                    >
                      <h3 style={{ margin: '0 0 4px', fontSize: '16px' }}>{course.name}</h3>
                      <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#666' }}>
                        {course.flashcardSets.length} set{course.flashcardSets.length !== 1 ? 's' : ''}
                        {' '}· {course.flashcardSets.reduce((n, s) => n + s.cards.length, 0)} cards
                      </p>
                      <div style={{ display: 'flex', gap: '2px', marginTop: '6px' }} onClick={e => e.stopPropagation()}>
                        <button
                          title="Rename"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: '4px 8px', color: '#555', lineHeight: 1 }}
                          onClick={() => { setEditingCourseId(course.id); setEditCourseName(course.name); }}
                        >
                          ✏️
                        </button>
                        <button
                          title="Delete"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: '4px 8px', color: '#c0392b', lineHeight: 1 }}
                          onClick={() => deleteCourse(course.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  )}

                  {expandedCourseId === course.id && (
                    <div style={{
                      background: '#f9f0f9',
                      border: '1px solid #d4b0d4',
                      borderRadius: '10px',
                      padding: '10px',
                      marginBottom: '10px'
                    }}>
                      <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#800080', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px' }}>
                        Sets
                      </p>

                      {course.flashcardSets.length === 0 ? (
                        <p style={{ color: '#888', fontSize: '13px', margin: '0 0 8px' }}>No sets yet.</p>
                      ) : (
                        course.flashcardSets.map(set => (
                          <div key={set.id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: '#fff',
                            border: '1px solid #e0e0e0',
                            borderRadius: '6px',
                            padding: '6px 10px',
                            marginBottom: '5px'
                          }}>
                            <div>
                              <span style={{ fontWeight: 'bold', fontSize: '13px' }}>{set.name}</span>
                              <span style={{ fontSize: '11px', color: '#888', marginLeft: '6px' }}>
                                {set.cards.length} card{set.cards.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                            <button
                              style={{ fontSize: '11px', padding: '2px 8px', backgroundColor: '#c0392b', borderRadius: '4px', border: 'none', color: '#fff', cursor: 'pointer' }}
                              onClick={() => deleteSet(course.id, set.id)}
                            >
                              ✕
                            </button>
                          </div>
                        ))
                      )}

                      {addingSetForCourse === course.id ? (
                        <div style={{ display: 'flex', gap: '5px', marginTop: '6px' }}>
                          <input
                            className="form-control"
                            style={{ flex: 1, fontSize: '13px', padding: '5px 8px' }}
                            placeholder="Set name (e.g. Midterm)"
                            value={newSetName}
                            onChange={e => setNewSetName(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && addSet(course.id)}
                            autoFocus
                          />
                          <button className="btn-home" style={{ fontSize: '12px', padding: '5px 10px' }} onClick={() => addSet(course.id)}>Add</button>
                          <button style={{ fontSize: '12px', padding: '5px 8px' }} onClick={() => setAddingSetForCourse(null)}>✕</button>
                        </div>
                      ) : (
                        <button
                          className="btn-home"
                          style={{ width: '100%', marginTop: '6px', fontSize: '12px', padding: '6px' }}
                          onClick={() => { setAddingSetForCourse(course.id); setNewSetName(''); }}
                        >
                          + Add Set
                        </button>
                      )}
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Courses;