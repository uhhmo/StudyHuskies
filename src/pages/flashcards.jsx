// ============================================================
// flashcards.jsx — Card editor
// shows all sets (grouped by course) in the sidebar.
// only handles adding/editing/deleting individual cards.
// set management lives in courses.jsx.
// ============================================================

import React, { useState } from 'react';
// REFACTOR (Standards Violation): replaced <a href="/courses"> with <Link to="/courses">.
// Plain anchor tags cause a full page reload in a React Router SPA.
// Using <Link> keeps navigation client-side and preserves app state.
import { Link } from 'react-router-dom';
import SetSidebar from '../components/SetSidebar';
import CardForm from '../components/CardForm';
import CardViewer from '../components/CardViewer';

function Flashcards({ sets = [], setSets = () => { }, courses = [] }) {

  const [activeSetId, setActiveSetId] = useState(sets[0]?.id || null);
  const [editingCardId, setEditingCardId] = useState(null);
  const [addingCard, setAddingCard] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  // REFACTOR (Data Clumps): editQ + editA were always declared and used together,
  // never independently. Grouped into a single state object.
  // Introduce Parameter Object refactoring from Fowler's catalogue.
  const [editCard, setEditCard] = useState({ question: '', answer: '' });

  // REFACTOR (Data Clumps): newQ + newA were always declared and used together,
  // never independently. Grouped into a single state object.
  const [newCard, setNewCard] = useState({ question: '', answer: '' });

  const activeSet = sets.find(set => set.id === activeSetId);

  // Returns the course name that contains a given set ID, or null if not found.
  function getCourseName(setId) {
    const course = courses.find(c => c.flashcardSets.some(set => set.id === setId));
    return course ? course.name : null;
  }

  // REFACTOR (Testability / inline onClick): the sidebar click handler previously
  // called three state setters inline in the JSX onClick with no name.
  // Extracted into a named function so the behavior is clear and testable.
  function selectSet(setId) {
    setActiveSetId(setId);
    setEditingCardId(null);
    setAddingCard(false);
    setCardIndex(0);
  }

  // Adds a new card to the active set.
  // Guards against blank question or answer before calling setSets.
  // Note: q and a are kept as the Firebase field names to avoid a breaking
  // schema change across the entire codebase. question/answer are used
  // internally in state only.
  function addCard() {
    if (!newCard.question.trim() || !newCard.answer.trim()) return;
    setSets(sets.map(set =>
      set.id === activeSetId
        ? { ...set, cards: [...set.cards, { id: Date.now(), q: newCard.question.trim(), a: newCard.answer.trim() }] }
        : set
    ));
    setNewCard({ question: '', answer: '' });
    setAddingCard(false);
  }

  // Removes a card from the active set by its ID.
  function deleteCard(cardId) {
    setSets(sets.map(set =>
      set.id === activeSetId
        ? { ...set, cards: set.cards.filter(card => card.id !== cardId) }
        : set
    ));
  }

  // Opens the edit form for a card, pre-filling state with its current values.
  // Maps Firebase field names (q, a) to readable internal names (question, answer).
  function startEditCard(card) {
    setEditingCardId(card.id);
    setEditCard({ question: card.q, answer: card.a });
  }

  // Saves the edited card back to the set.
  // Guards against blank question or answer before calling setSets.
  function saveCard(cardId) {
    if (!editCard.question.trim() || !editCard.answer.trim()) return;
    setSets(sets.map(set =>
      set.id === activeSetId
        ? { ...set, cards: set.cards.map(card => card.id === cardId ? { ...card, q: editCard.question.trim(), a: editCard.answer.trim() } : card) }
        : set
    ));
    setEditingCardId(null);
  }

  function nextCard() {
    setCardIndex(i => (i === activeSet.cards.length - 1 ? 0 : i + 1));
  }

  function prevCard() {
    setCardIndex(i => (i === 0 ? activeSet.cards.length - 1 : i - 1));
  }

  // ── Empty state ──────────────────────────────────────────────

  if (sets.length === 0) {
    return (
      <main>
        <h2>Flashcards</h2>
        <p style={{ color: '#888' }}>
          No flashcard sets yet. Go to{' '}
          {/* REFACTOR: <a href> → <Link to> — see import comment above */}
          <Link to="/courses" style={{ color: '#800080', fontWeight: 'bold' }}>Courses</Link>
          {' '}to create a course and add sets first!
        </p>
      </main>
    );
  }

  // ── Main render ──────────────────────────────────────────────

  return (
    <main style={{ maxWidth: '960px', margin: '0 auto', padding: '20px' }}>
      <h2>Flashcards</h2>
      <p>Select a set to add or edit its cards.</p>

      <div className="d-flex flex-column flex-md-row" style={{ gap: '24px', alignItems: 'flex-start', justifyContent: 'center' }}>

        {/* Sidebar — set list */}
        <SetSidebar
          sets={sets}
          activeSetId={activeSetId}
          onSelectSet={selectSet}
          getCourseName={getCourseName}
        />

        {/* Main panel — card editor */}
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

            {/* Add card form */}
            {addingCard && (
              <div style={{ background: '#f9f0f9', border: '1px dashed #800080', borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
                <CardForm
                  question={newCard.question}
                  answer={newCard.answer}
                  onChangeQuestion={e => setNewCard({ ...newCard, question: e.target.value })}
                  onChangeAnswer={e => setNewCard({ ...newCard, answer: e.target.value })}
                  onSave={addCard}
                  onCancel={() => { setAddingCard(false); setNewCard({ question: '', answer: '' }); }}
                  questionId="new-card-question"
                  answerId="new-card-answer"
                />
              </div>
            )}

            {/* Card display */}
            {activeSet.cards.length === 0 ? (
              <p style={{ color: '#888' }}>No cards yet — add your first one above!</p>
            ) : (
              <CardViewer
                card={activeSet.cards[cardIndex]}
                cardIndex={cardIndex}
                totalCards={activeSet.cards.length}
                editingCardId={editingCardId}
                editCard={editCard}
                setEditCard={setEditCard}
                onEdit={startEditCard}
                onDelete={deleteCard}
                onSave={saveCard}
                onCancel={() => setEditingCardId(null)}
                onNext={nextCard}
                onPrev={prevCard}
              />
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