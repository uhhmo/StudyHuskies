import React, { useState } from "react";

function Studying() {
  // sets (hard-coded for now)
  const info340 = [
    { q: "What is a semantic tag?", a: "A semantic tag describes the meaning of its content." },
    { q: "What does the <p> tag do?", a: "It creates a paragraph of text." },
    { q: "What does CSS control?", a: "CSS controls layout and styling." },
  ];

  const midterm = [
    { q: "What is JSX?", a: "JSX lets you write HTML-like code in JavaScript." },
    { q: "What is a prop?", a: "Props pass data into a component." },
    { q: "What does useState do?", a: "It stores state and updates the UI when it changes." },
  ];

  const finalSet = [
    { q: "What is routing?", a: "It lets your app show different pages without reloading." },
    { q: "What is an event handler?", a: "A function that runs when a user clicks/inputs/etc." },
    { q: "Why use .map() in React?", a: "To render repeated elements from an array." },
  ];

  const [setName, setSetName] = useState("INFO 340");
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // pick which cards to show
  let cards = info340;
  if (setName === "Midterm") {
    cards = midterm;
  } else if (setName === "Final") {
    cards = finalSet;
  }

  function changeSet(e) {
    setSetName(e.target.value);
    setCardIndex(0);
    setIsFlipped(false);
  }

  function flip() {
    setIsFlipped(!isFlipped);
  }

  function next() {
    setIsFlipped(false);

    if (cardIndex === cards.length - 1) {
      setCardIndex(0);
    } else {
      setCardIndex(cardIndex + 1);
    }
  }

  function prev() {
    setIsFlipped(false);

    if (cardIndex === 0) {
      setCardIndex(cards.length - 1);
    } else {
      setCardIndex(cardIndex - 1);
    }
  }

  return (
    <main>
      <section style={{ textAlign: "center" }}>
        <h2>Studying</h2>
        <p>Select a flashcard set to view cards.</p>

        <label htmlFor="setSelect">Choose a set</label>
        <select id="setSelect" value={setName} onChange={changeSet}>
          <option>INFO 340</option>
          <option>Midterm</option>
          <option>Final</option>
        </select>
      </section>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <article
          className="study-card"
          onClick={flip}
          style={{
            cursor: "pointer",
            border: "1px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "white",
            width: "520px",
            height: "220px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "22px" }}>
            {isFlipped ? cards[cardIndex].a : cards[cardIndex].q}
          </h3>

          <p style={{ marginTop: "12px", fontSize: "14px" }}>
            Card {cardIndex + 1} of {cards.length}
          </p>
        </article>

        <div className="study-btn-row">
          <button className="btn-home" onClick={prev}>Prev</button>
          <button className="btn-home" onClick={flip}>Flip</button>
          <button className="btn-home" onClick={next}>Next</button>
        </div>
      </section>
    </main>
  );
}

export default Studying;
