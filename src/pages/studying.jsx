// ============================================================
// studying.jsx
// ============================================================
import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";

function Studying({ courses }) {
  

  const [courseIndex, setCourseIndex] = useState(0);
  const [setIndex, setSetIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (courses.length === 0) {
  return (
    <main>
      <section style={{ textAlign: "center" }}>
        <h2>Studying</h2>
        <p>No courses yet. Go add a course first.</p>
      </section>
    </main>
  );
}

  const currentCourse = courses[courseIndex];
  if (currentCourse.flashcardSets.length === 0) {
  return (
    <main>
      <section style={{ textAlign: "center" }}>
        <h2>Studying</h2>
        <p>This course has no flashcard sets yet.</p>
      </section>
    </main>
  );
}
  const currentSet = currentCourse.flashcardSets[setIndex];
  if (currentSet.cards.length === 0) {
  return (
    <main>
      <section style={{ textAlign: "center" }}>
        <h2>Studying</h2>
        <p>This set has no cards yet.</p>
      </section>
    </main>
  );
}
  const currentCard = currentSet.cards[cardIndex];

  function changeCourse(e) {
    const picked = e.target.value;

    for (let i = 0; i < courses.length; i++) {
      if (courses[i].name === picked) {
        setCourseIndex(i);
        setSetIndex(0);
        setCardIndex(0);
        setFlipped(false);
        break;
      }
    }
  }

  function changeSet(e) {
    const picked = e.target.value;

    for (let i = 0; i < currentCourse.flashcardSets.length; i++) {
      if (currentCourse.flashcardSets[i].name === picked) {
        setSetIndex(i);
        setCardIndex(0);
        setFlipped(false);
        break;
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
          {currentCourse.flashcardSets.map((s) => (
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
        <div style={{ width: "520px", maxWidth: "100%", marginTop: "20px" }}>
          <ProgressBar current={cardIndex} total={currentSet.cards.length} />
        </div>
      </section>
    </main>
  );
}

export default Studying;
