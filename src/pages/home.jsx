// ============================================================
// home.jsx
// ============================================================
import React from 'react';
import HeroImage from '../components/HeroImage';
import HomeSection from '../components/HomeSection';
import HomeLogo from '../components/HomeLogo';


function home() {
  return (
    <div className="mb-4">
      <HeroImage/>
      <HomeSection/>
      <HomeLogo/>
    </div>
  );
}
export default home;