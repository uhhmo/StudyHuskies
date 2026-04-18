import React from 'react';
import { Link } from 'react-router';
import huskyIcon from '../assets/icon.png';

function HomeLogo() {
  return (
    <div className="text-center">
      <img src={huskyIcon} alt="Husky Icon" className="rounded-circle mb-5 shadow-sm husky-image"/>
      <div>
         <Link to="/about" className="btn-home">Learn More</Link>
      </div>
    </div>
  );
};

export default HomeLogo;
