// ============================================================
// App.jsx
// Root component for the Study Huskies app.
// holds all shared course + card data in one place (state)
// persists that data to localStorage so it survives page refreshes
// passes data down to pages that need it as props
// sets up client-side routing with react-router-dom
//
// Data flow:
//   App.jsx 
//     Courses   → can add/delete/rename courses and sets
//     Flashcards → can add/edit/delete cards within a set
//     Studying  → read-only, just displays the cards
// ============================================================

import React, { useState } from 'react'; 
import Navbar from './components/Navbar';
import Home from './pages/home';
import Courses from './pages/courses';
import Flashcards from './pages/flashcards';
import Studying from './pages/studying';
import Quiz from './pages/quiz';
import About from './pages/about';
import SignIn from './pages/signin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';

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

// used by Flashcards and Studying which don't need the course structure
function flattenSets(courses) {
  return courses.flatMap(c => c.flashcardSets);
}


// Load from localStorage if available, otherwise use defaults
function loadCourses() {
  try {
    const saved = localStorage.getItem('studyHuskies_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  } catch {
    return INITIAL_COURSES;
  }
}

// Save to localStorage every time courses change
function saveCourses(courses) {
  try {
    localStorage.setItem('studyHuskies_courses', JSON.stringify(courses));
  } catch {
    // localStorage unavailable — changes will still work this session
  }
}

function App() {
  //single shared state — all pages read/write from this
  const [courses, setCourses] = useState(INITIAL_COURSES);

  //derived flat list of sets for Flashcards + Studying
  const sets = flattenSets(courses);

  // wrap setCourses so every update also saves to localStorage
  function updateCourses(newCourses) {
    setCourses(newCourses);
    saveCourses(newCourses);
  }

  //when Flashcards edits cards, this syncs the change back into courses and saves here
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
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses"    element={<Courses   courses={courses} setCourses={setCourses} />} />
        <Route path="/flashcards" element={<Flashcards sets={sets} setSets={setSets} />} />
        <Route path="/studying"   element={<Studying  sets={sets} />} />
        <Route path="/quiz"    element={<Quiz />} />
        <Route path="/about"   element={<About />} />
        <Route path="/signin"  element={<SignIn />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;