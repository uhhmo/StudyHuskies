import React from 'react';

function QuizStats(props) {
    return (
        <div className="quiz-stats row bg-light p-2 border rounded">
            <div className="col">
                <strong>Question: {props.current} / {props.total} </strong> 
            </div>
             <div className="col text-center">
                <strong>Checkpoint: {props.checkpoint} </strong>
            </div>
            <div className="col text-end">
                <strong>Lives: {props.lives} </strong> 
            </div>
        </div>
    )
}
export default QuizStats;
