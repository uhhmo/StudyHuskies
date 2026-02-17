import React from 'react';
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

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/studying" element={<Studying />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
       <Footer/>
    </Router>
  );
}

export default App;