import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

function Navbar({ currentUser, auth }) {

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/signin');
  };

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
        {currentUser ? (
          <button onClick={handleSignOut} className="btn-home">
            Sign Out
          </button>
        ) : (
          <Link to="/signin" className="btn-home">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;