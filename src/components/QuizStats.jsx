import React from 'react';

function QuizStats() {
    return (
        <div class="quiz-stats">
            <div class="stat-item">
                <div class="stat-icon">⏱</div>
                <div class="stat-label">Time Remaining:</div>
                <div class="stat-value">01:20</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Question</div>
                <div class="stat-value">3 / 10</div>
            </div>
            <div class="stat-item">
                <div class="stat-icon">⭐</div>
                <div class="stat-label">Score:</div>
                <div class="stat-value">150</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Lives:</div>
                <div class="stat-value">2</div>
            </div>
        </div>
    )
}
    export default QuizStats;
