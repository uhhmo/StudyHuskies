import React from 'react';
import CardForm from './CardForm';

function CardViewer({ card, cardIndex, totalCards, editingCardId, editCard, setEditCard, onEdit, onDelete, onSave, onCancel, onNext, onPrev }) {
  return (
    <div>
      <div className="cards-grid" style={{ width: '100%', maxWidth: '100%', margin: 0 }}>
        <article key={card.id} className="study-card">
          {editingCardId === card.id ? (
            <CardForm
              question={editCard.question}
              answer={editCard.answer}
              onChangeQuestion={e => setEditCard({ ...editCard, question: e.target.value })}
              onChangeAnswer={e => setEditCard({ ...editCard, answer: e.target.value })}
              onSave={() => onSave(card.id)}
              onCancel={onCancel}
              questionId={`edit-question-${card.id}`}
              answerId={`edit-answer-${card.id}`}
            />
          ) : (
            <div>
              <h3>{card.q}</h3>
              <p>{card.a}</p>
              <div style={{ display: 'flex', gap: '2px', marginTop: '8px' }}>
                <button
                  title="Edit card"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: '4px 8px', color: '#555', lineHeight: 1 }}
                  onClick={() => onEdit(card)}
                >
                  ✏️
                </button>
                <button
                  title="Delete card"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: '4px 8px', color: '#c0392b', lineHeight: 1 }}
                  onClick={() => onDelete(card.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          )}
        </article>
      </div>

      <div className="study-btn-row">
        <button className="btn-home" onClick={onPrev}>Prev</button>
        <button className="btn-home" onClick={onNext}>Next</button>
      </div>
      <p style={{ fontSize: '12px', color: '#888', marginTop: '4px', textAlign: 'center' }}>
        Card {cardIndex + 1} of {totalCards}
      </p>
    </div>
  );
}

export default CardViewer;