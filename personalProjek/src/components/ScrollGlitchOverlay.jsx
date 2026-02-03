import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { RunnableText } from "./text/RunnableText";

const ScrollGlitchOverlay = ({ active }) => {
  const { t } = useLanguage();
  // Robotic easing for "snappy" mechanical feel
  const mechEase = [0.43, 0.13, 0.23, 0.96]; 

  return (
    <AnimatePresence>
      {active && (
        <motion.div
           style={{
               position: "fixed", top: 0, left: 0, width: "100%", height: "100vh",
               zIndex: 9999, pointerEvents: "none",
               display: 'flex', justifyContent: 'center', alignItems: 'center',
           }}
        >
            {/* 1. BACKGROUND DIM (Instant) */}
            <motion.div 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            />

            {/* 2. TOP & BOTTOM SHUTTERS (Heavy Plating) */}
            <motion.div
                style={{
                    position: "absolute", top: 0, left: 0, width: "100%", height: "50%",
                    background: "#0a0a0a",
                    borderBottom: "2px solid #ff0033",
                    boxShadow: "0 0 50px rgba(255, 0, 51, 0.2)"
                }}
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.4, ease: mechEase }}
            >
                <div style={{ position: 'absolute', bottom: 10, right: 20, color: '#ff0033', fontFamily: 'monospace', fontSize: '10px' }}>
                    <RunnableText text={t('overlay.hydraulicA')} />
                </div>
            </motion.div>
            
            <motion.div
                style={{
                    position: "absolute", bottom: 0, left: 0, width: "100%", height: "50%",
                    background: "#0a0a0a",
                    borderTop: "2px solid #ff0033",
                    boxShadow: "0 0 50px rgba(255, 0, 51, 0.2)"
                }}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.4, ease: mechEase }}
            >
                 <div style={{ position: 'absolute', top: 10, left: 20, color: '#ff0033', fontFamily: 'monospace', fontSize: '10px' }}>
                    <RunnableText text={t('overlay.hydraulicB')} />
                 </div>
            </motion.div>

            {/* 3. DIAGONAL SECURITY BLADES (The "Futuristic" Iris) */}
            {/* Left Blade */}
            <motion.div 
                style={{
                    position: 'absolute', top: 0, left: 0, width: '0%', height: '100%',
                    background: 'rgba(255, 0, 51, 0.1)',
                    borderRight: '1px solid rgba(255,0,51,0.5)',
                    transform: 'skewX(-20deg)',
                    transformOrigin: 'top left',
                    backdropFilter: 'blur(5px)'
                }}
                animate={{ width: ['0%', '60%', '0%'] }}
                transition={{ duration: 0.8, times: [0, 0.5, 1], ease: "easeInOut" }}
            />
             {/* Right Blade */}
            <motion.div 
                style={{
                    position: 'absolute', top: 0, right: 0, width: '0%', height: '100%',
                    background: 'rgba(255, 0, 51, 0.1)',
                    borderLeft: '1px solid rgba(255,0,51,0.5)',
                    transform: 'skewX(-20deg)',
                    transformOrigin: 'bottom right',
                    backdropFilter: 'blur(5px)'
                }}
                animate={{ width: ['0%', '60%', '0%'] }}
                transition={{ duration: 0.8, times: [0, 0.5, 1], ease: "easeInOut" }}
            />

            {/* 4. CENTRAL HOLOGRAPHIC HUD (The "Core") */}
            <motion.div
                style={{
                    position: 'relative', zIndex: 100,
                    width: '300px', height: '100px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ delay: 0.2, duration: 0.3 }}
            >
                {/* Spinning Rings */}
                <motion.div 
                    style={{ position: 'absolute', width: '120px', height: '120px', border: '2px solid #ff0033', borderRadius: '50%', borderTopColor: 'transparent', borderBottomColor: 'transparent' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                 <motion.div 
                    style={{ position: 'absolute', width: '140px', height: '140px', border: '1px dashed rgba(255,0,51,0.5)', borderRadius: '50%' }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Text Glitch */}
                <h1 style={{ color: '#fff', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '2rem', margin: 0, textShadow: '0 0 10px #ff0033', letterSpacing: '4px' }}>
                    <RunnableText text={t('overlay.systemJump')} />
                </h1>
                
                {/* Progress Bar */}
                <div style={{ width: '200px', height: '4px', background: '#333', marginTop: '10px', borderRadius: '2px', overflow: 'hidden' }}>
                    <motion.div 
                        style={{ width: '100%', height: '100%', background: '#ff0033' }}
                        initial={{ x: '-100%' }}
                        animate={{ x: '0%' }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                    />
                </div>
                
                {/* Data Numbers */}
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px', marginTop: '5px', fontSize: '10px', fontFamily: 'monospace', color: '#ff0033' }}>
                    <span>COORD: {Math.floor(Math.random() * 9999)}</span>
                    <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.2, repeat: Infinity }}>
                        <RunnableText text={t('overlay.secure')} />
                    </motion.span>
                </div>
            </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollGlitchOverlay;
