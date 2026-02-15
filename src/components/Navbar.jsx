import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="nav">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/flashcards">Flashcards</Link></li>
        <li><Link to="/studying">Studying</Link></li>
        <li><Link to="/quiz">Quiz</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <div>
        <Link to="/signin" className="btn-home">Sign in</Link>
      </div>
    </nav>
  );
};

export default Navbar;