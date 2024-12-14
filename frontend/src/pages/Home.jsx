import React from "react";
import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";
import HeroSection from "../components/Home/HeroSection";
import Features from "../components/Home/Features";
import PlatformSection from "../components/Home/PlatformSection"
import FeaturesSection from "../components/Home/FeaturesSection";
import Testimonials from "../components/Home/Testimonials"

function Home() {
  return (
    <div data-theme="light" className="bg-grayBackground">
      <HeroSection />
      <FeaturesSection />
      <Features />
      <PlatformSection />
      <Testimonials />
       <Footer />
    </div>
  );
}

export default Home;
