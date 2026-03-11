import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';


// Guys i took most of this from studying + game quiz so its kinda a mash of the both which i think is cool
function MissedCards(props) {
    const params = useParams();
    const navigate = useNavigate();


    const [currentId, setcurrentId] = useState(0);
    const [userInput, setUserInput] = useState("");

    const setId = params.setId;
    let currentSet = null;

    function handleReturnToStudy() {
        navigate('/studying');
    }

    if (!currentSet || !currentSet.cards || currentSet.cards.length === 0) {
        return (<main className='d-flex flex-column align-items-center'>
            <p className="m-5">No missed cards! Great job!</p>
            <button className="btn-home" onClick={handleReturnToStudy}>Return to Studying</button>
        </main>);
    }

    const cards = currentSet.cards;

    const handleAnswer = function () {
        const correctAnswer = cards[currentId].a.toLowerCase();
        const userAnswer = userInput.toLowerCase();
        const nextIndex = currentId + 1;

        if (userAnswer === correctAnswer) {
            setCurrentInfo("Correct! Great job!");
            setcurrentId(nextIndex);
        } else {
            setCurrentInfo("Incorrect! Try again!");
        }
    setUserInput("");
    }

return (
    <section className="mb-5 p-4 border rounded shadow-sm">
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
    </section>
);
}

export default MissedCards;