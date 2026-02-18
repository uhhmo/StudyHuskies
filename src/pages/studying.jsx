import React, { useState } from "react";

function Studying() {
  const courses = [
    {
      name: "INFO 340",
      sets: [
        {
          name: "Midterm",
          cards: [
            { q: "What is a semantic tag?", a: "A semantic tag describes the meaning of its content." },
            { q: "What does the <p> tag do?", a: "It creates a paragraph of text." },
            { q: "What does CSS control?", a: "CSS controls layout and styling." }
          ]
        },
        {
          name: "Final",
          cards: [
            { q: "What is routing?", a: "It lets your app show different pages without reloading." },
            { q: "What is state?", a: "State stores values that can change and update the UI." },
            { q: "Why use .map()?", a: "To show repeated elements from an array." }
          ]
        }
      ]
    },
    {
      name: "INFO 201",
      sets: [
        {
          name: "Midterm",
          cards: [
            { q: "What is R?", a: "A programming language used a lot for data and stats." },
            { q: "What does c() do?", a: "Combines values into a vector." },
            { q: "What is a vector?", a: "A list of values (usually the same type)." }
          ]
        },
        {
          name: "Final",
          cards: [
            { q: "What is a data frame?", a: "A table of rows and columns in R." },
            { q: "What does summary() do?", a: "Gives basic summary stats for data." },
            { q: "What is ggplot used for?", a: "Making charts/graphs." }
          ]
        }
      ]
    }
  ];

  const [courseIndex, setCourseIndex] = useState(0);
  const [setIndex, setSetIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const currentCourse = courses[courseIndex];
  const currentSet = currentCourse.sets[setIndex];
  const currentCard = currentSet.cards[cardIndex];

  function changeCourse(e) {
    const picked = e.target.value;

    for (let i = 0; i < courses.length; i++) {
      if (courses[i].name === picked) {
        setCourseIndex(i);
        setSetIndex(0);
        setCardIndex(0);
        setFlipped(false);
      }
    }
  }

  function changeSet(e) {
    const picked = e.target.value;

    for (let i = 0; i < currentCourse.sets.length; i++) {
      if (currentCourse.sets[i].name === picked) {
        setSetIndex(i);
        setCardIndex(0);
        setFlipped(false);
      }
    }
  }

  function flipCard() {
    setFlipped(!flipped);
  }

  function nextCard() {
    setFlipped(false);

    if (cardIndex === currentSet.cards.length - 1) {
      setCardIndex(0);
    } else {
      setCardIndex(cardIndex + 1);
    }
  }

  function prevCard() {
    setFlipped(false);

    if (cardIndex === 0) {
      setCardIndex(currentSet.cards.length - 1);
    } else {
      setCardIndex(cardIndex - 1);
    }
  }

  return (
    <main>
      <section style={{ textAlign: "center" }}>
        <h2>Studying</h2>
        <p>Select a class and set to study.</p>

        <label htmlFor="courseSelect">Choose a class</label>
        <select id="courseSelect" value={currentCourse.name} onChange={changeCourse}>
          {courses.map((c) => (
            <option key={c.name}>{c.name}</option>
          ))}
        </select>

        <br />

        <label htmlFor="setSelect">Choose a set</label>
        <select id="setSelect" value={currentSet.name} onChange={changeSet}>
          {currentCourse.sets.map((s) => (
            <option key={s.name}>{s.name}</option>
          ))}
        </select>
      </section>

      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
        <article className="study-card" onClick={flipCard}>
          <h3>{flipped ? currentCard.a : currentCard.q}</h3>
          <p>
            Card {cardIndex + 1} of {currentSet.cards.length}
          </p>
        </article>

        <div className="study-btn-row">
          <button className="btn-home" onClick={prevCard}>Prev</button>
          <button className="btn-home" onClick={flipCard}>Flip</button>
          <button className="btn-home" onClick={nextCard}>Next</button>
        </div>
      </section>
    </main>
  );
}

export default Studying;
