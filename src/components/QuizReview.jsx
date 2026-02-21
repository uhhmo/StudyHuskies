import React from 'react';

function QuizReview() {
    return (
        <section class="p-4 border rounded shadow-sm text-center">
            <h2>Adventure Complete!</h2>

            <div class="score-item">
                <div class="score-label">Final Score</div>
                <div class="score-value">720</div>
            </div>
            <div class="score-item">
                <div class="score-label">Accuracy</div>
                <div class="score-value">80%</div>
            </div>
            <div class="score-item">
                <div class="score-label">Time Spent Adventuring</div>
                <div class="score-value">2:45</div>
            </div>

            <h3 class="mt-4">Recommended Review</h3>
            <ul class="list-unstyled">
                <li>JavaScript Events</li>
                <li>DOM Traversal</li>
            </ul>
            <div class="mt-3">
                <a href="flashcards.html" class="btn btn-outline-dark me-2">Review Flashcards</a>
                <a href="gameQuiz.html" class="btn btn-dark">Play Again</a>
            </div>
        </section>
    );
}

export default QuizReview;
