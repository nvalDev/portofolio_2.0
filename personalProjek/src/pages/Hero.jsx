import React from "react";
import Typewriter from "typewriter-effect"; 
import "../css/hero.css"; 
import { motion } from "framer-motion";
import { GlitchText } from "../components/GlitchText";
import LeftHUD from "../components/LeftHUD";
import { useLanguage } from "../context/LanguageContext";
import { RunnableText } from "../components/text/RunnableText";

const Hero = ({ onNavigate }) => {
  const { t } = useLanguage(); 
  return (
    <div className="hero-container" id="hero" style={{ height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div className="container px-4">
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
             <GlitchText text={t("hero.digital")} className="d-inline-block" /> <span className="highlight">{t("hero.experience")}</span> <br/> 
             <GlitchText text={t("hero.constructor")} className="d-block" />
          </motion.h1>
          
          <motion.div 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
             <span style={{color: 'white'}}><RunnableText text={t("hero.rolePrefix")} /></span>
            <Typewriter
              options={{
                strings: t("hero.roles"),
                autoStart: true,
                loop: true,
                cursor: "_",
                deleteSpeed: 20,
                delay: 50
              }}
            />
          </motion.div>
          
          <motion.p 
            className="hero-text"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
             <RunnableText text={t("hero.initMsg")} /> <br/>
             <RunnableText text={t("hero.target")} />
          </motion.p>

          <motion.button
            onClick={() => onNavigate('/project')}
            className="hero-button mb-5"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <RunnableText text={t("hero.exploreBtn")} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Hero;