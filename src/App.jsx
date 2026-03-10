// ============================================================
// App.jsx
// root component for the Study Huskies app.
// holds all shared course + card data in one place (state)
// persists that data to localStorage so it survives page refreshes
// passes data down to pages that need it as props
// sets up client-side routing with react-router-dom
// ============================================================

import React, { useState, useEffect } from 'react';
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
import { ref, onValue, set } from 'firebase/database';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from '../firebase-config';


function flattenSets(courses) {
  return courses.flatMap(c => c.flashcardSets);
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function App() {
  const [courses, setCourses] = useState([]);
  const [lives, setLives] = useState(3);
  const sets = flattenSets(courses);
  const [loading, setLoading] = useState(true);

  const userId = "USER_ID_1"; // THIS IS WHAT WE NEED TO CHANGE FOR USER AUTH


  // ok guys this is what we replaced load courses w/ per the ta help (bless up thank you ta)
  useEffect(() => {
    const coursesRef = ref(db, `users/${userId}/courses`);

    const unregisterFunction = onValue(coursesRef, (snapshot) => {
      const data = snapshot.val();

      let startArray = data;
      if (!Array.isArray(data)) {
        startArray = Object.values(data);
      }


      const toarray = startArray.map(course => ({
        ...course,
        flashcardSets: (course.flashcardSets || []).map(set => ({
          ...set,
          cards: set.cards || []
        }))
      }));

      setCourses(toarray);
      setLoading(false);
    });

    return () => unregisterFunction();
  }, []);

  // this is the updared async save courses per ta thx!!
  async function saveCourses(newCourses) {
    try {
      await set(ref(db, `users/${userId}/courses`), newCourses);
    } catch (error) {
      console.error("wromp womp", error);
    }
  }

  // this is pretty much the same
  function updateCourses(newCourses) {
    saveCourses(newCourses);
  }

  function setSets(newSets) {
    const updated = courses.map(course => ({
      ...course,
      flashcardSets: (course.flashcardSets || []).map(set => {
        const match = newSets.find(s => s.id === set.id);
        return match || set;
      })
    }));
    updateCourses(updated);
  }

  //lowk we could make this look better but someone else can do that
  if (loading) {
    return <div className="text-center">Loading Study Huskies!!</div>;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses courses={courses} setCourses={updateCourses} />} />
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