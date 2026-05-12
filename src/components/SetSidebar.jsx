import React from 'react';
import { Link } from 'react-router-dom';

function SetSidebar({ sets, activeSetId, onSelectSet, getCourseName }) {
  return (
    <aside style={{ width: '200px', flexShrink: 0 }}>
      <h3 style={{ margin: '0 0 4px' }}>My Sets</h3>
      <p style={{ fontSize: '12px', color: '#888', margin: '0 0 12px' }}>
        {/* REFACTOR: <a href> → <Link to> */}
        Add sets in <Link to="/courses" style={{ color: '#800080' }}>Courses</Link>.
      </p>

      {sets.map(set => {
        const courseName = getCourseName(set.id);
        return (
          <div
            key={set.id}
            className={activeSetId === set.id ? 'btn-home flashcard-set-item' : 'course-card flashcard-set-item'}
            style={{
              cursor: 'pointer',
              marginBottom: '8px',
              display: 'block',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.16), 0 1px 3px rgba(0,0,0,0.23)',
            }}
            // REFACTOR (Testability): was an inline arrow calling 4 setters.
            // Now delegates to the named selectSet() function above.
            onClick={() => onSelectSet(set.id)}
          >
            <p style={{ margin: '0 0 2px', fontWeight: 'bold', fontSize: '14px' }}>{set.name}</p>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.75 }}>
              {set.cards.length} card(s)
            </p>
            {/* REFACTOR (Mysterious Names): getCourseName called once into a
                variable — previously called twice per set (once in the condition,
                once inside it), running the same find() twice unnecessarily. */}
            {courseName && (
              <p style={{ margin: '2px 0 0', fontSize: '11px', opacity: 0.6 }}>
                {courseName}
              </p>
            )}
          </div>
        );
      })}
    </aside>
  );
}

export default SetSidebar;