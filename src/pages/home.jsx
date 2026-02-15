import React from 'react';
import HeroImage from '../components/HeroImage';
import HomeSection from '../components/HomeSection';
import HomeLogo from '../components/HomeLogo';
import HomeForm from '../components/HomeForm';
import Footer from '../components/Footer';


function home() {
  return (
    <div className="home-container">
      <HeroImage/>
      <HomeSection/>
      <HomeLogo/>
      <HomeForm/>
      <Footer/>
    </div>
  );
}
export default home;