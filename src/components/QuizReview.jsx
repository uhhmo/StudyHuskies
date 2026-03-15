import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// formats seconds as a readable string like "1m 42s" or "58s"
function formatTime(totalSeconds) {
    if (!totalSeconds && totalSeconds !== 0) return '--';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (minutes === 0) return `${seconds}s`;
    return `${minutes}m ${seconds}s`;
}

function QuizReview(props) {
    const location = useLocation();
    const quizData = location.state;

    const totalCorrect = quizData ? quizData.totalCorrect : 0;
    const totalAttempts = quizData ? quizData.totalAttempts : 0;
    const totalQuestions = quizData ? quizData.totalQuestions : 0;
    const localMissedCards = quizData ? quizData.localMissedCards : [];
    const elapsedSeconds = quizData ? quizData.elapsedSeconds : null;

    let accuracy = 0;
    if (totalAttempts > 0) {
        accuracy = Math.round((totalCorrect / totalAttempts) * 100);
    }

    return (
        <section className="p-4 border rounded shadow-sm text-center">
            <h2>Adventure Complete!</h2>

            <div className="score-item">
                <div className="score-label">Final Score</div>
                <div className="score-value">{totalCorrect} / {totalQuestions}</div>
            </div>
            <div className="score-item">
                <div className="score-label">Accuracy</div>
                <div className="score-value">{accuracy}%</div>
            </div>
            <div className="score-item">
                <div className="score-label">Time</div>
                <div className="score-value">{formatTime(elapsedSeconds)}</div>
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