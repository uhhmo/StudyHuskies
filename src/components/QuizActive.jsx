import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuizStats from './QuizStats';
import ProgressBar from './ProgressBar';

function QuizActive(props) {
    const params = useParams();
    const navigate = useNavigate();


    const [currentId, setcurrentId] = useState(0);
    const [checkpoint, setCheckpoint] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [currentInfo, setCurrentInfo] = useState("Lets Adventure!");

    const [totalCorrect, setTotalCorrect] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);

    const [missedCards, setMissedCards] = useState([]);

    const setId = params.setId;
    let currentSet = null;

    if (props.sets) {
        for (let i = 0; i < props.sets.length; i++) {
            const course = props.sets[i];

            if (course.flashcardSets) {
                for (let j = 0; j < course.flashcardSets.length; j++) {
                    const targetSet = course.flashcardSets[j];

                    if (String(targetSet.id) === String(setId)) {
                        currentSet = targetSet;
                        break;
                    }
                }
            }
            if (currentSet) break;
        }
    }

    if (!currentSet || !currentSet.cards || currentSet.cards.length === 0) {
    return <p>No cards found for this set.</p>;
    }

    const cards = currentSet.cards;

    const handleAnswer = function () {
        const correctAnswer = cards[currentId].a.toLowerCase();
        const userAnswer = userInput.toLowerCase();
        
        if (userAnswer === correctAnswer) {
            const nextIndex = currentId + 1;
            const newCorrect = totalCorrect + 1;
            const newAttempts = totalAttempts + 1;
            if (nextIndex % 2 === 0) {
                setCheckpoint(nextIndex);
            }
            
            if (nextIndex >= cards.length) {
                navigate(`/quiz/${setId}/results`, {
                    state: {
                        totalCorrect: newCorrect,
                        totalAttempts: newAttempts,
                        totalQuestions: cards.length,
                        missedCards: missedCards
                    }
                });
            } else {
                setTotalCorrect(newCorrect);
                setTotalAttempts(newAttempts);
                setcurrentId(nextIndex);
                setCurrentInfo("Correct! Great job!");
            }
        } else {
            const remainingLives = props.lives - 1;
            const newAttempts = totalAttempts + 1;
            const updatedMissedCards = [...missedCards, cards[currentId]];
            setMissedCards(updatedMissedCards);
            
            if (remainingLives <= 0) {
                navigate(`/quiz/${setId}/results`, {
                    state: {
                        totalCorrect: totalCorrect,
                        totalAttempts: newAttempts,
                        totalQuestions: cards.length,
                        missedCards: updatedMissedCards
                    }
                });
            } else {
                props.setLives(remainingLives);
                setTotalAttempts(newAttempts);
                setCurrentInfo("Wrong! Sending you back to the checkpoint.");
                setcurrentId(checkpoint);
            }
        }
        setUserInput("");
    };

    return (
        <section className="mb-5 p-4 border rounded shadow-sm">
            <h2 id="info">{currentInfo}</h2>
            <QuizStats
                current={currentId + 1}
                total={cards.length}
                lives={props.lives}
                checkpoint={checkpoint}
            />

            <div className="my-4">
                <p className="fs-5">
                    {cards[currentId].q}
                </p>

                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Type your answer here"
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                />

                <button type="button" className="btn btn-home" onClick={handleAnswer}>
                    Submit Answer
                </button>
            </div>

            <ProgressBar
                current={currentId}
                total={cards.length}
            />
        </section>
    );
}

export default QuizActive;