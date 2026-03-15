// ============================================================
// abour.jsx
// ============================================================
import React from 'react';
import AboutSection from '../components/AboutSection';

function about({currentUser}) {
  return (
    <AboutSection currentUser={currentUser}/>
  );
}

export default about;