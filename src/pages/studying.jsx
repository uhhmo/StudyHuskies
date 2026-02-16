import React, { useState } from "react";

function Studying() {

  const courses = [
    {
      name: "INFO 340",
      cards: [
        { q: "What is a semantic tag?", a: "A semantic tag describes the meaning of its content." },
        { q: "What does the <p> tag do?", a: "It creates a paragraph of text." },
        { q: "What does CSS control?", a: "CSS controls layout and styling." }
      ]
    },
    {
      name: "Midterm",
      cards: [
        { q: "What is JSX?", a: "JSX lets you write HTML-like code in JavaScript." },
        { q: "What is a prop?", a: "Props pass data into a component." },
        { q: "What does useState do?", a: "It stores state and updates the UI when it changes." }
      ]
    },
    {
      name: "Final",
      cards: [
        { q: "What is routing?", a: "It lets your app show different pages without reloading." },
        { q: "What is an event handler?", a: "A function that runs when a user clicks." },
        { q: "Why use .map()?", a: "To render repeated elements from arrays." }
      ]
    }
  ];

  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  function handleChange(e) {
    const courseName = e.target.value;

    for (let i = 0; i < courses.length; i++) {
      if (courses[i].name === courseName) {
        setSelectedCourse(courses[i]);
        setCardIndex(0);
        setFlipped(false);
      }
    }
  }

  function flip() {
    setFlipped(!flipped);
  }

  function next() {
    setFlipped(false);

    if (cardIndex === selectedCourse.cards.length - 1) {
      setCardIndex(0);
    } else {
      setCardIndex(cardIndex + 1);
    }
  }

  function prev() {
    setFlipped(false);

    if (cardIndex === 0) {
      setCardIndex(selectedCourse.cards.length - 1);
    } else {
      setCardIndex(cardIndex - 1);
    }
  }

  const card = selectedCourse.cards[cardIndex];

  return (
    <main>
      <section style={{ textAlign: "center" }}>
        <h2>Studying</h2>
        <p>Select a flashcard set to view cards.</p>

        <label htmlFor="setSelect">Choose a set</label>
        <select id="setSelect" onChange={handleChange}>
          {courses.map((course) => (
            <option key={course.name}>{course.name}</option>
          ))}
        </select>
      </section>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px"
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
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "20px"
          }}
        >
          <h3>
            {flipped ? card.a : card.q}
          </h3>
        </article>

        <p style={{ marginTop: "10px" }}>
          Card {cardIndex + 1} of {selectedCourse.cards.length}
        </p>

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
