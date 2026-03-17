import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function QuizMode(props) {

    const [selectedSet, setSelectedSet] = useState("");
    const [currentInfo, setCurrentInfo] = useState("Lets adventure!!");
    const navigate = useNavigate();

    const handleStart = () => {
        if (!selectedSet) {
            setCurrentInfo("Please select a flashcard set first.");
            return;
        }

        if (!props.lives) {
            setCurrentInfo("Please enter how many lives you want.");
            return;
        }

        if (props.lives <= 0) {
            setCurrentInfo("Please a valid number of lives.");
            return;
        }

        navigate(`/quiz/${selectedSet}`);
    };

    if (!props.sets || props.sets.length === 0) {
        return <div>Loading study sets!</div>;
    }

    return (

        <section className="mb-5 p-4 border rounded shadow-sm">
            <h2>Select Adventure Mode</h2>

            <div className="mb-4">
                <label htmlFor="flashcardSet" className="form-label">Select Flashcard Set</label>
                <select
                    id='flashcardSet'
                    name="flashcardSet"
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

            <div className="mb-4">
                <label htmlFor="livesCount" className="form-label">Number of Lives</label>
                <input id='livesCount' name="livesCount" type="number" className="form-control" onChange={(e) => props.setLives(Number(e.target.value))} />
                <div className="form-text">How many mistakes are allowed?</div>
            </div>

            <p>{currentInfo}</p>
            <button onClick={handleStart} className="btn btn-home">Start Quiz</button>
        </section>
    )
}

export default QuizMode;