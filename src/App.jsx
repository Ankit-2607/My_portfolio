import React from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import Navbar from './sections/Navbar.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Contact from './sections/Contact.jsx';
import Education from './sections/Education.jsx';
import ProjectSection from './sections/Project.jsx';
import Footer from './sections/Footer.jsx';


gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <About/>
      <ProjectSection />
      <Education/>
      <Contact/>
      <Footer/>
    </main>
  )
}

export default App;