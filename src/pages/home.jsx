// ============================================================
// home.jsx
// ============================================================
import React from 'react';
import HeroImage from '../components/HeroImage';
import HomeSection from '../components/HomeSection';
import HomeLogo from '../components/HomeLogo';
import HomeForm from '../components/HomeForm';
import Footer from '../components/Footer';


function home() {
  return (
    <div>
      <HeroImage/>
      <HomeSection/>
      <HomeLogo/>
      <HomeForm/>
    </div>
  );
}
export default home;