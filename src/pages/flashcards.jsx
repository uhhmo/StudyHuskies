// ============================================================
// flashcards.jsx — Card editor
// shows all sets (grouped by course) in the sidebar.
// only handles adding/editing/deleting individual cards.
// set management lives in courses.jsx.
// ============================================================

import React, { useState } from 'react';

function Flashcards({ sets = [], setSets = () => {} }) {

  const [activeSetId, setActiveSetId] = useState(sets[0]?.id || null);
  const [editingCardId, setEditingCardId] = useState(null);
  const [editQ, setEditQ] = useState('');
  const [editA, setEditA] = useState('');
  const [addingCard, setAddingCard] = useState(false);
  const [newQ, setNewQ] = useState('');
  const [newA, setNewA] = useState('');

  const activeSet = sets.find(s => s.id === activeSetId);

  function addCard() {
    if (!newQ.trim() || !newA.trim()) return;
    setSets(sets.map(s =>
      s.id === activeSetId
        ? { ...s, cards: [...s.cards, { id: Date.now(), q: newQ.trim(), a: newA.trim() }] }
        : s
    ));
    setNewQ(''); setNewA(''); setAddingCard(false);
  }

  function deleteCard(cardId) {
    setSets(sets.map(s =>
      s.id === activeSetId
        ? { ...s, cards: s.cards.filter(c => c.id !== cardId) }
        : s
    ));
  }

  function startEditCard(card) {
    setEditingCardId(card.id);
    setEditQ(card.q);
    setEditA(card.a);
  }

  function saveCard(cardId) {
    if (!editQ.trim() || !editA.trim()) return;
    setSets(sets.map(s =>
      s.id === activeSetId
        ? { ...s, cards: s.cards.map(c => c.id === cardId ? { ...c, q: editQ.trim(), a: editA.trim() } : c) }
        : s
    ));
    setEditingCardId(null);
  }

  if (sets.length === 0) {
    return (
      <main>
        <h2>Flashcards</h2>
        <p style={{ color: '#888' }}>
          No flashcard sets yet. Go to{' '}
          <a href="/courses" style={{ color: '#800080', fontWeight: 'bold' }}>Courses</a>
          {' '}to create a course and add sets first!
        </p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: '960px', margin: '0 auto', padding: '20px' }}>
      <h2>Flashcards</h2>
      <p>Select a set to add or edit its cards.</p>

      <div className="d-flex flex-column flex-md-row" style={{gap: '24px', alignItems: 'flex-start', justifyContent: 'center' }}>

        
        <aside style={{ width: '200px', flexShrink: 0 }}>
          <h3 style={{ margin: '0 0 4px' }}>My Sets</h3>
          <p style={{ fontSize: '12px', color: '#888', margin: '0 0 12px' }}>
            Add sets in <a href="/courses" style={{ color: '#800080' }}>Courses</a>.
          </p>

          {sets.map(set => (
            <div
              key={set.id}
              className="course-card"
              style={{
                cursor: 'pointer',
                marginBottom: '8px',
                backgroundColor: activeSetId === set.id ? '#800080' : 'white',
                color: activeSetId === set.id ? 'white' : 'black',
                transition: 'background-color 0.15s ease',
              }}
              onClick={() => {
                setActiveSetId(set.id);
                setEditingCardId(null);
                setAddingCard(false);
              }}
            >
              <p style={{ margin: '0 0 2px', fontWeight: 'bold', fontSize: '14px' }}>{set.name}</p>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.75 }}>
                {set.cards.length} card(s)
              </p>
            </div>
          ))}
        </aside>

        
        {activeSet ? (
          <section style={{ flex: 1, minWidth: 0, maxWidth: '680px' }}>
            <h2 style={{ marginTop: 0 }}>{activeSet.name}</h2>

            <button
              className="btn-home"
              style={{ marginBottom: '16px' }}
              onClick={() => { setAddingCard(!addingCard); setEditingCardId(null); }}
            >
              + Add Card
            </button>

            
            {addingCard && (
              <div style={{ background: '#f9f0f9', border: '1px dashed #800080', borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
                <label>Question</label>
                <input
                  className="form-control mb-2"
                  placeholder="Type a question"
                  value={newQ}
                  onChange={e => setNewQ(e.target.value)}
                  autoFocus
                />
                <label>Answer</label>
                <input
                  className="form-control mb-2"
                  placeholder="Type an answer"
                  value={newA}
                  onChange={e => setNewA(e.target.value)}
                />
                <div className="button-row">
                  <button type="button" className="btn-home" onClick={addCard}>Save</button>
                  <button type="button" className="btn-home" onClick={() => { setAddingCard(false); setNewQ(''); setNewA(''); }}>Cancel</button>
                </div>
              </div>
            )}

            {activeSet.cards.length === 0 ? (
              <p style={{ color: '#888' }}>No cards yet — add your first one above!</p>
            ) : (
              <div className="cards-grid" style={{ width: '100%', maxWidth: '100%', margin: 0 }}>
                {activeSet.cards.map((card, idx) => (
                  <article key={card.id} className="study-card">

                    {editingCardId === card.id ? (
                      <div>
                        <label>Question</label>
                        <input
                          className="form-control mb-2"
                          value={editQ}
                          onChange={e => setEditQ(e.target.value)}
                        />
                        <label>Answer</label>
                        <input
                          className="form-control mb-2"
                          value={editA}
                          onChange={e => setEditA(e.target.value)}
                        />
                        <div className="button-row">
                          <button className="btn-home" onClick={() => saveCard(card.id)}>Save</button>
                          <button className="btn-home" onClick={() => setEditingCardId(null)}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3>#{idx + 1} {card.q}</h3>
                        <p>{card.a}</p>
                        <div style={{ display: 'flex', gap: '2px', marginTop: '8px' }}>
                          <button
                            title="Edit card"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: '4px 8px', color: '#555', lineHeight: 1 }}
                            onClick={() => startEditCard(card)}
                          >
                            ✏️
                          </button>
                          <button
                            title="Delete card"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: '4px 8px', color: '#c0392b', lineHeight: 1 }}
                            onClick={() => deleteCard(card.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    )}

                  </article>
                ))}
              </div>
            )}
          </section>
        ) : (
          <p style={{ color: '#888' }}>Select a set from the sidebar to start editing cards.</p>
        )}

      </div>
    </main>
  );
}

export default Flashcards;