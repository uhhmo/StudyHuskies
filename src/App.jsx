import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Courses from './pages/Courses';
import Flashcards from './pages/Flashcards';
import Studying from './pages/Studying';
import Quiz from './pages/Quiz';
import About from './pages/About';
import SignIn from './pages/SignIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/studying" element={<Studying />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;