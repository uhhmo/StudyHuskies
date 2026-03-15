import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
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

    const [localMissedCards, setLocalMissedCards] = useState([]);
    /** timer feature */
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const intervalRef = useRef(null);

    // start the timer on mount, clear it on unmount
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setElapsedSeconds(prev => prev + 1);
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, []);

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
        return (<div className='d-flex flex-column justify-content-center align-items-center'><p>No cards found for this set.</p>
            <Link to='/quiz' className="btn-home">Return to Quiz</Link>
        </div>)
    }

    const cards = currentSet.cards;

    // Helper to stop the timer and navigate to results, passing elapsed time
    function finishQuiz(finalCorrect, finalAttempts, missed) {
        clearInterval(intervalRef.current);
        navigate(`/quiz/${setId}/results`, {
            state: {
                totalCorrect: finalCorrect,
                totalAttempts: finalAttempts,
                totalQuestions: cards.length,
                localMissedCards: missed,
                elapsedSeconds: elapsedSeconds
            }
        });
    }

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
                finishQuiz(newCorrect, newAttempts, localMissedCards);
            } else {
                setTotalCorrect(newCorrect);
                setTotalAttempts(newAttempts);
                setcurrentId(nextIndex);
                setCurrentInfo("Correct! Great job!");
            }
        } else {
            const remainingLives = props.lives - 1;
            const newAttempts = totalAttempts + 1;

            if (!localMissedCards.includes(cards[currentId])) {
                const updatedLocalMissedCards = [...localMissedCards, cards[currentId]];
                setLocalMissedCards(updatedLocalMissedCards);

                const updatedMissedCards = [...props.missedCards, cards[currentId]];
                props.saveMissedCards(updatedMissedCards);
            }

            if (remainingLives <= 0) {
                finishQuiz(totalCorrect, newAttempts, localMissedCards);
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
                elapsedSeconds={elapsedSeconds}
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
                    onKeyDown={e => e.key === 'Enter' && handleAnswer()}
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