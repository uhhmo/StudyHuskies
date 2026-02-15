import React from 'react';
import { Link } from 'react-router-dom';

function HomeSection() {
  return (
     <main class="container my-5">
      <section className="mb-5 p-4 border rounded shadow-sm text-center">
        <h2>Course Dashboard</h2>
        <p>Manage your courses flashcard sets.</p>
        <Link to="/courses" className="btn-home">Go to Courses</Link>
      </section>

      <section className="mb-5 p-4 border rounded shadow-sm text-center">
        <h2>Flashcards</h2>
        <p>Create and study your terms with interactive decks.</p>
        <Link to="/flashcards" className="btn-home">Go to Flashcards</Link>
      </section>

      <section className="mb-5 p-4 border rounded shadow-sm text-center">
        <h2>Game Quiz</h2>
        <p>Test your knowledge with gamified challenges.</p>
        <Link to="/quiz" className="btn-home">Go to Quiz</Link>
      </section>
    </main>
  );
}

export default HomeSection;
