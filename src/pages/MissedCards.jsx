import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';


// Guys i took most of this from studying + game quiz so its kinda a mash of the both which i think is cool
function MissedCards(props) {
    const navigate = useNavigate();

    const [currentId, setcurrentId] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [currentInfo, setCurrentInfo] = useState("Lets review!!");

    const cards = props.missedCards || [];

    const currentCard = cards[currentId];

    function handleReturnToStudy() {
        navigate('/studying');
    }

    if (cards.length === 0) {
        return (<main className='d-flex flex-column align-items-center'>
            <p className="m-5">No missed cards! Great job!</p>
            <button className="btn-home" onClick={handleReturnToStudy}>Return to Studying</button>
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
        while(currentId === nextId) {
            nextId = Math.floor(Math.random() * cards.length);
            if(cards.length <= 1) {
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
                    <button type="button" className="btn btn-home" onClick={handleSkip}>
                        Skip
                    </button>
                    <button type="button" className="btn btn-home" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </section>
        </main>
    );
}

export default MissedCards;