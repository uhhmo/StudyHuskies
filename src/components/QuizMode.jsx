import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function QuizMode(props) {

    const [selectedSet, setSelectedSet] = useState("");
    const navigate = useNavigate();

    const handleStart = () => {
        if (selectedSet) {
            navigate(`/quiz/${selectedSet}`);
        }
    };

    return (

        <section className="mb-5 p-4 border rounded shadow-sm">
            <h2>Select Adventure Mode</h2>

            <div className="mb-4">
                <label for="flashcardSet" className="form-label">Select Flashcard Set</label>
                <select
                    className="form-select"
                    value={selectedSet}
                    onChange={(e) => setSelectedSet(e.target.value)}
                >
                    <option value="">Choose a set!!</option>
                    {props.sets.map(set => (
                        <option key={set.id} value={set.id}>{set.name}</option>
                    ))}
                </select>
            </div>

            <div class="mb-4">
                <label for="livesCount" className="form-label">Number of Lives</label>
                <input type="number" className="form-control" onChange={(e) => props.setLives(e.target.value)}/>
                <div class="form-text">How many mistakes are allowed?</div>
            </div>

            <button onClick={handleStart} className="btn btn-home mt-3">Start Quiz</button>
        </section>
    )
}

export default QuizMode;