// ============================================================
// flashcards.jsx — Card editor
// shows all sets (grouped by course) in the sidebar.
// only handles adding/editing/deleting individual cards.
// set management lives in courses.jsx.
// ============================================================

import React, { useState } from 'react';

function Flashcards({ sets = [], setSets = () => { }, courses = [] }) {

  const [activeSetId, setActiveSetId] = useState(sets[0]?.id || null);
  const [editingCardId, setEditingCardId] = useState(null);
  const [editCard, setEditCard] = useState({ question: '', answer: '' });
  const [newCard, setNewCard] = useState({ question: '', answer: '' });
  const [addingCard, setAddingCard] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  function getCourseName(setId) {
    const course = courses.find(c => c.flashcardSets.some(set => set.id === setId));
    return course ? course.name : null;
  }

  function nextCard() {
    setCardIndex(i => (i === activeSet.cards.length - 1 ? 0 : i + 1));
  }

  function prevCard() {
    setCardIndex(i => (i === 0 ? activeSet.cards.length - 1 : i - 1));
  }

  const activeSet = sets.find(s => s.id === activeSetId);

  function addCard() {
    if (!newCard.question.trim() || !newCard.answer.trim()) return;
    setSets(sets.map(set =>
      set.id === activeSetId
        ? { ...set, cards: [...set.cards, { id: Date.now(), q: newCard.question.trim(), a: newCard.answer.trim() }] }
        : set
    ));
    setNewCard({ question: '', answer: '' }); setAddingCard(false);
  }

  function deleteCard(cardId) {
    setSets(sets.map(set =>
      set.id === activeSetId
        ? { ...set, cards: set.cards.filter(c => c.id !== cardId) }
        : set
    ));
  }

  function startEditCard(card) {
    setEditingCardId(card.id);
    setEditCard({ question: card.q, answer: card.a });
  }

  function saveCard(cardId) {
    if (!editCard.question.trim() || !editCard.answer.trim()) return;
    setSets(sets.map(set =>
      set.id === activeSetId
        ? { ...set, cards: set.cards.map(c => c.id === cardId ? { ...c, q: editCard.question.trim(), a: editCard.answer.trim() } : c) }
        : set
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

      <div className="d-flex flex-column flex-md-row" style={{ gap: '24px', alignItems: 'flex-start', justifyContent: 'center' }}>


        <aside style={{ width: '200px', flexShrink: 0 }}>
          <h3 style={{ margin: '0 0 4px' }}>My Sets</h3>
          <p style={{ fontSize: '12px', color: '#888', margin: '0 0 12px' }}>
            Add sets in <a href="/courses" style={{ color: '#800080' }}>Courses</a>.
          </p>

          {sets.map(set => (
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
              onClick={() => {
                setActiveSetId(set.id);
                setEditingCardId(null);
                setAddingCard(false);
                setCardIndex(0);
              }}
            >
              <p style={{ margin: '0 0 2px', fontWeight: 'bold', fontSize: '14px' }}>{set.name}</p>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.75 }}>
                {set.cards.length} card(s)
              </p>
              {getCourseName(set.id) && (
                <p style={{ margin: '2px 0 0', fontSize: '11px', opacity: 0.6 }}>
                  {getCourseName(set.id)}
                </p>
              )}
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
                <label htmlFor='new-card-question'>Question</label>
                <input
                  id='new-card-question'
                  name='new-card-question'
                  className="form-control mb-2"
                  placeholder="Type a question"
                  value={newCard.question}
                  onChange={e => setNewCard({ ...newCard, question: e.target.value })}
                  autoFocus
                />
                <label htmlFor='new-card-answer'>Answer</label>
                <input
                  id='new-card-answer'
                  name='new-card-answer'
                  className="form-control mb-2"
                  placeholder="Type an answer"
                  value={newCard.answer}
                  onChange={e => setNewCard({ ...newCard, answer: e.target.value })}
                />
                <div className="button-row">
                  <button type="button" className="btn-home" onClick={addCard}>Save</button>
                  <button type="button" className="btn-home" onClick={() => { setAddingCard(false); setNewCard({ question: '', answer: '' }); }}>Cancel</button>
                </div>
              </div>
            )}

            {activeSet.cards.length === 0 ? (
              <p style={{ color: '#888' }}>No cards yet — add your first one above!</p>
            ) : (
              <div>
                <div className="cards-grid" style={{ width: '100%', maxWidth: '100%', margin: 0 }}>
                  {[activeSet.cards[cardIndex]].map((card) => (
                    <article key={card.id} className="study-card">
                      {editingCardId === card.id ? (
                        <div>
                          <label htmlFor={`edit-question-${card.id}`}>Question</label>
                          <input id={`edit-question-${card.id}`} name="edit-question" className="form-control mb-2" value={editCard.question} onChange={e => setEditCard({ ...editCard, question: e.target.value })} />

                          <label htmlFor={`edit-answer-${card.id}`}>Answer</label>
                          <input id={`edit-answer-${card.id}`} name="edit-answer" className="form-control mb-2" value={editCard.answer} onChange={e => setEditCard({ ...editCard, answer: e.target.value })} />

                          <div className="button-row">
                            <button className="btn-home" onClick={() => saveCard(card.id)}>Save</button>
                            <button className="btn-home" onClick={() => setEditingCardId(null)}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h3>{card.q}</h3>
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
                <div className="study-btn-row">
                  <button className="btn-home" onClick={prevCard}>Prev</button>
                  <button className="btn-home" onClick={nextCard}>Next</button>
                </div>
                <p style={{ fontSize: '12px', color: '#888', marginTop: '4px', textAlign: 'center' }}>
                  Card {cardIndex + 1} of {activeSet.cards.length}
                </p>
              </div>
            )}
          </section>
        ) : (
          <p style={{ color: '#888' }}>Select a set to start editing cards!</p>
        )}
      </div>
    </main>
  );
}

export default Flashcards;