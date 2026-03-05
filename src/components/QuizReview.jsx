import React from 'react';
import { Link } from 'react-router';

function QuizReview(props) {

    return (
        <section className="p-4 border rounded shadow-sm text-center">
            <h2>Adventure Complete!</h2>

            <div className="score-item">
                <div class="score-label">Final Score</div>
                <div class="score-value">{props.totalCorrect}</div>
            </div>
            <div className="score-item">
                <div class="score-label">Accuracy</div>
                <div class="score-value">80%</div>
            </div>

            <h3 className="mt-4">Recommended Review</h3>
            <ul className="list-unstyled">
                <li>JavaScript Events</li>
                <li>DOM Traversal</li>
            </ul>
            <div className="mt-3">
                <Link to="/flashcards" className="btn btn-outline-dark me-2">Review Flashcards</Link>
                <Link to="/Quiz" className="btn btn-dark">Play Again</Link>
            </div>
        </section>
    );
}

export default QuizReview;
