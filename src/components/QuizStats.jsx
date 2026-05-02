import React from 'react';

// formats a number of seconds as MM:SS
export function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function QuizStats(props) {
    return (
        <div className="quiz-stats row bg-light p-2 border rounded">
            <div className="col">
                <strong>Question: {props.current} / {props.total}</strong>
            </div>
            <div className="col text-center">
                <strong>Checkpoint: {props.checkpoint}</strong>
            </div>
            <div className="col text-center">
                <strong>⏱ {formatTime(props.elapsedSeconds || 0)}</strong>
            </div>
            <div className="col text-end">
                <strong>Lives: {props.lives}</strong>
            </div>
        </div>
    );
}

export default QuizStats;
