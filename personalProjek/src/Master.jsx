import React, { useState }  from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

// CSS
import './css/global.css';
import './css/ornaments.css';
import './css/responsive.css';

//components
import ThreeBackground from "./components/ThreeBackground";
import ScrollGlitchOverlay from "./components/ScrollGlitchOverlay";
import ScreenOverlay from "./components/ScreenOverlay";
import NavigationDock from "./components/NavigationDock";
import RightHUD from "./components/RightHUD";
import LeftHUD from "./components/LeftHUD";
import TechHeader from "./components/TechHeader";
import SmoothScrollManager from "./components/SmoothScrollManager";
import EntranceScreen from "./components/EntranceScreen";
import AudioManager from "./components/AudioManager";

// Assets
import bgmFile from "./assets/zandar.mp3";
import sfxFile from "./assets/glitch.mp3";
import entranceFile from "./assets/enterance.mp3"; // User specified spelling

// Sections
import Hero from './pages/Hero.jsx';
import About from './pages/About.jsx';
import Project from './pages/Project.jsx';
import Contact from './pages/Contact.jsx';

const Master = () => {
    const [showEntrance, setShowEntrance] = useState(true);
    const [glitchActive, setGlitchActive] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (path) => {
        // Prevent navigating to the same page
        if (location.pathname === path) return;

        // 1. Trigger Overlay (System Jump Start)
        setGlitchActive(true);

        // 2. Wait for Shutters to Close (400ms)
        setTimeout(() => {
            navigate(path);
            
            // 3. Keep Shutters Closed while loading/rendering new page (Simulated delay)
            setTimeout(() => {
                setGlitchActive(false); // Open Shutters
            }, 800); 
        }, 600); 
    };
 
  return (
    <div className="d-flex flex-column min-vh-100 position-relative">
      <AudioManager 
        bgmSrc={bgmFile} 
        sfxSrc={sfxFile} 
        entranceSrc={entranceFile}
        isNavigating={glitchActive} 
        showEntrance={showEntrance} 
      />

      {/* Initial Entrance Animation */}
      {showEntrance && <EntranceScreen onComplete={() => setShowEntrance(false)} />}

      <TechHeader />
      <ThreeBackground />
      <ScreenOverlay />
      <ScrollGlitchOverlay active={glitchActive} />
      <RightHUD />
      {(location.pathname === '/' || location.pathname === '/contact') && (
          <LeftHUD />
      )}
      
      {/* Navigation Systems */}
      <NavigationDock onNavigate={handleNavigate} />
      
      <main className="flex-grow-1 position-relative main-content">
        {/* Global Ornaments */}
        <div className="ornament-hex-grid"></div>
        <div className="ornament-corner-tl"></div>
        <div className="ornament-corner-br"></div>
        <div className="ornament-circle-compass"></div>
        {(location.pathname === '/' || location.pathname === '/contact') && (
             <div className="ornament-side-bar"></div>
        )}

        <Routes>
            <Route path="/" element={<Hero onNavigate={handleNavigate} />} />
            <Route path="/about" element={<About />} />
            <Route path="/project" element={<Project />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      
    </div>
  );
};

export default Master;