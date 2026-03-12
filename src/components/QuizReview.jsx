import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function QuizReview(props) {

    const location = useLocation();
    const quizData = location.state;

    const totalCorrect = quizData ? quizData.totalCorrect : 0;
    const totalAttempts = quizData ? quizData.totalAttempts : 0;
    const totalQuestions = quizData ? quizData.totalQuestions : 0;
    const localMissedCards = quizData ? quizData.localMissedCards : [];

    let accuracy = 0;

    if (totalAttempts > 0) {
        accuracy = Math.round((totalCorrect / totalAttempts) * 100);
    }

    return (
        <section className="p-4 border rounded shadow-sm text-center">
            <h2>Adventure Complete!</h2>

            <div className="score-item">
                <div class="score-label">Final Score</div>
                <div className="score-value">{totalCorrect} / {totalQuestions}</div>
            </div>
            <div className="score-item">
                <div class="score-label">Accuracy</div>
                <div className="score-value">{accuracy}%</div>
            </div>

            <h3 className="mt-4">Recommended Review</h3>
            <ul className="list-unstyled">
                {localMissedCards.length === 0 ? (
                    <li>No missed cards. Nice job!</li>
                ) : (
                    localMissedCards.map(card => (
                        <li key={card.id}>{card.q}</li>
                    ))
                )}
            </ul>
            <div className="mt-3">
                <Link to="/missedCards" className="btn btn-outline-dark me-2">Review Missed Flashcards</Link>
                <Link to="/Quiz" className="btn btn-dark">Play Again</Link>
            </div>
        </section>
    );
}

export default QuizReview;
