// ============================================================
// App.jsx
// root component for the Study Huskies app.
// holds all shared course + card data in one place (state)
// persists that data to localStorage so it survives page refreshes
// passes data down to pages that need it as props
// sets up client-side routing with react-router-dom
// ============================================================

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Courses from './pages/courses';
import Flashcards from './pages/flashcards';
import Studying from './pages/studying';
import Quiz from './pages/quiz';
import QuizMode from './components/QuizMode';
import QuizActive from './components/QuizActive';
import About from './pages/about';
import SignIn from './pages/signin';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import QuizReview from './components/QuizReview';

const INITIAL_COURSES = [
  {
    id: 1,
    name: 'INFO 340',
    flashcardSets: [
      {
        id: 101,
        name: 'INFO 340 Midterm',
        cards: [
          { id: 1, q: 'What is a semantic tag?', a: 'A tag that describes the meaning of its content.' },
          { id: 2, q: 'What does CSS control?', a: 'Layout and styling of a page.' },
          { id: 3, q: 'What does the <p> tag do?', a: 'It creates a paragraph of text.' },
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'INFO 201',
    flashcardSets: [
      {
        id: 201,
        name: 'INFO 201 Midterm',
        cards: [
          { id: 1, q: 'What is R?', a: 'A programming language for data and stats.' },
          { id: 2, q: 'What does c() do?', a: 'Combines values into a vector.' },
        ]
      }
    ]
  }
];

function flattenSets(courses) {
  return courses.flatMap(c => c.flashcardSets);
}


function loadCourses() {
  try {
    const saved = localStorage.getItem('studyHuskies_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  } catch {
    return INITIAL_COURSES;
  }
}

function saveCourses(courses) {
  try {
    localStorage.setItem('studyHuskies_courses', JSON.stringify(courses));
  } catch {
  }
}

function App() {
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const sets = flattenSets(courses);
  const [lives, setLives] = useState(3);

  function updateCourses(newCourses) {
    setCourses(newCourses);
    saveCourses(newCourses);
  }

  function setSets(newSets) {
    const updated = courses.map(course => ({
      ...course,
      flashcardSets: course.flashcardSets.map(set => {
        const match = newSets.find(s => s.id === set.id);
        return match || set;
      })
    }));
    updateCourses(updated);
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses courses={courses} setCourses={setCourses} />} />
        <Route path="/flashcards" element={<Flashcards sets={sets} setSets={setSets} />} />
        <Route path="/studying" element={<Studying courses={courses} />} />
        
        <Route path="/Quiz" element={<Quiz sets={courses} />}>
          <Route index element={<QuizMode sets={sets} lives={lives} setLives={setLives} />} />
          <Route path=":setId" element={<QuizActive sets={courses} lives={lives} setLives={setLives} />} />
          <Route path=":setId/results" element={<QuizReview />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;