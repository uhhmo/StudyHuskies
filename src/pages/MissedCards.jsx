import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';


// Guys i took most of this from studying + game quiz so its kinda a mash of the both which i think is cool
function MissedCards(props) {
    const navigate = useNavigate();

    const [currentId, setcurrentId] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [currentInfo, setCurrentInfo] = useState("Lets review!!");

    const cards = props.missedCards || [];

    const currentCard = cards[currentId];

    if (cards.length === 0) {
        return (<main className='d-flex flex-column align-items-center gap-2'>
            <div className="m-3 d-flex flex-column align-items-center ">
                <p>You missed no cards during the adventure quiz!</p>
                <p>Nothing to study - Great job!</p>
            </div>
            <Link to='/studying' className="btn-home">Return to Studying</Link>
            <Link to='/quiz' className="btn-home">Return to Quiz</Link>
        </main>);
    }

    function handleAnswer() {
        const correctAnswer = currentCard.a.toLowerCase();
        const userAnswer = userInput.toLowerCase();

        if (userAnswer === correctAnswer) {
            setCurrentInfo("Correct! Great job!");
            handleDelete()
        } else {
            setCurrentInfo("Incorrect! Try again!");
        }
        setUserInput("");
    }

    function handleDelete() {
        const updated = props.missedCards.filter(card => card.q !== currentCard.q);
        props.saveMissedCards(updated);
        handleRandomCard();
    }

    function handleSkip() {
        setCurrentInfo("Skipped!");
        handleRandomCard();
    }

    // this implementation could be WAYY more optimized if someone wants to do that :)
    function handleRandomCard() {
        let nextId = currentId;
        while (currentId === nextId) {
            nextId = Math.floor(Math.random() * cards.length);
            if (cards.length <= 1) {
                break;
            }
        }
        setcurrentId(nextId);
    }

    if (!currentCard) {
        return (<div className="text-center">Loading Cards!!</div>);
    }

    return (
        <main>
            <section className="mb-5 p-4 border rounded shadow-sm">
                <div>
                    <p>{currentInfo}</p>
                </div>
                <div className="my-4">
                    <label htmlFor='user-answer' className="fs-5">
                        {cards[currentId].q}
                    </label>

                    <input
                        id='user-answer'
                        name="user-answer"
                        type="text"
                        className="form-control mb-3"
                        placeholder="Type your answer here"
                        value={userInput}
                        onChange={e => setUserInput(e.target.value)}
                    />

                    <div className="study-btn-row">
                        <button type="button" className="btn btn-home" onClick={handleAnswer}>
                            Submit Answer
                        </button>
                        <button type="button" className="btn btn-home" onClick={handleSkip}>
                            Skip
                        </button>
                        <button type="button" className="btn btn-home" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </section>
            <div className='study-btn-row'>
                <Link to='/studying' className="btn-home">Return to Studying</Link>
                <Link to='/quiz' className="btn-home">Return to Quiz</Link>
            </div>
        </main>
    );
}

export default MissedCards;