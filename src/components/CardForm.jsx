import React from 'react';

function CardForm({ question, answer, onChangeQuestion, onChangeAnswer, onSave, onCancel, questionId, answerId }) {
  return (
    <div>
      <label htmlFor={questionId}>Question</label>
      <input
        id={questionId}
        name={questionId}
        className="form-control mb-2"
        placeholder="Type a question"
        value={question}
        onChange={onChangeQuestion}
      />
      <label htmlFor={answerId}>Answer</label>
      <input
        id={answerId}
        name={answerId}
        className="form-control mb-2"
        placeholder="Type an answer"
        value={answer}
        onChange={onChangeAnswer}
      />
      <div className="button-row">
        <button type="button" className="btn-home" onClick={onSave}>Save</button>
        <button type="button" className="btn-home" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default CardForm;