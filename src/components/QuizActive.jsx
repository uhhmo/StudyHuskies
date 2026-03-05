import React, { useState } from 'react';
import { useParams } from 'react-router';
import QuizStats from './QuizStats';
import ProgressBar from './ProgressBar';

function QuizActive(props) {
    const params = useParams();


    const [currentId, setcurrentId] = useState(0);
    const [checkpoint, setCheckpoint] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [currentInfo, setCurrentInfo] = useState("Lets Adventure!");

    const [totalCorrect, setTotalCorrect] = useState("0");
    const [totalAttempts, setTotalAttempts] = useState("0");

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

    const cards = currentSet.cards;

    const handleAnswer = function () {
        const correctAnswer = cards[currentId].a.toLowerCase();
        const userAnswer = userInput.toLowerCase();

        if (userAnswer === correctAnswer) {

            const nextIndex = currentId + 1;

            if (nextIndex % 2 === 0) {
                setCheckpoint(nextIndex);
            }

            if (nextIndex >= cards.length) {
                // WE NEED TO NAVIGATE TO QUIZ REVIEW HERE (this is when they win)
                // SOME HOW NEED TO GIVE THEM ALL THE STATISTICS + THE QUESTIONS THEY MISSED

            } else {
                if(currentInfo != "Wrong! Sending you back to the checkpoint.") {
                    setTotalCorrect(totalCorrect + 1);
                }
                setcurrentId(nextIndex);
                setCurrentInfo("Correct! Great job!");
                setTotalAttempts(totalAttempts + 1);
            }
        } else {

            const remainingLives = props.lives - 1;

            if (remainingLives <= 0) {
                //WE NEED TO NAVIGATE TO QUIZ REVIEW HERE (this is when they loose)
                // SOME HOW NEED TO GIVE THEM ALL THE STATISTICS + THE QUESTIONS THEY MISSED

            } else {
                props.setLives(remainingLives);
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