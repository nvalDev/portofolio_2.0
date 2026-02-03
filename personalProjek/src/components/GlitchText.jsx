import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const GlitchText = ({ text, className, speed = 50 }) => {
  const [displayText, setDisplayText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  
  // Random chars including some 'matrix' style ones
  const cryptoChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?¥€£";

  // Determine if we have furigana
  const hasFurigana = text.includes && text.includes('|');
  const [baseText, furigana] = hasFurigana ? text.split('|') : [text, ''];

  useEffect(() => {
    let iteration = 0;
    let interval = null;
    
    // Initial scramble or progressive reveal
    interval = setInterval(() => {
      setDisplayText(prev => 
        baseText
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return baseText[index];
            }
            return cryptoChars[Math.floor(Math.random() * cryptoChars.length)];
          })
          .join("")
      );
      
      if (iteration >= baseText.length) { 
        clearInterval(interval);
      }
      
      iteration += 1/3; // Controls the speed of resolution (larger = faster)
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed, baseText]); // Added baseText dep

  return (
    <motion.span 
        className={className} 
        style={{ position: 'relative', display: 'inline-block' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <span style={{ position: 'relative', zIndex: 2 }}>
            {hasFurigana ? (
                <ruby style={{ 
                    rubyPosition: 'over',
                    rubyAlign: 'center',
                    margin: '0 0.1em',
                    fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif',
                }}>
                    {displayText}
                    <rt style={{ 
                        fontSize: '0.55em', 
                        opacity: 0.9, 
                        fontFamily: 'inherit', 
                        letterSpacing: '0', // Normal spacing for reading
                        color: '#ff0033', 
                        fontWeight: 'bold',
                        textShadow: 'none',
                        paddingBottom: '2px'
                    }}>
                        {furigana}
                    </rt>
                </ruby>
            ) : (
                displayText
            )}
        </span>
        
        {/* Red Shift Layer */}
        <AnimatePresence>
            {isHovered && (
                <motion.span
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ 
                        x: [-2, 2, -1, 3, 0], 
                        opacity: [0.5, 0.8, 0.3, 0.9, 0],
                        clipPath: [
                            "inset(20% 0 0 0)", 
                            "inset(0 0 60% 0)", 
                            "inset(50% 0 30% 0)", 
                            "inset(0 0 0 0)"
                        ]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 0.2 }}
                    style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        color: 'red',
                        opacity: 0.7,
                        zIndex: 1,
                        mixBlendMode: 'screen',
                        width: '100%'
                    }}
                >
                    {baseText}
                </motion.span>
            )}
        </AnimatePresence>
        
        {/* Cyan Shift Layer */}
        <AnimatePresence>
             {isHovered && (
                <motion.span
                    initial={{ x: 0, opacity: 0 }}
                    animate={{ 
                        x: [2, -2, 1, -3, 0], 
                        opacity: [0.5, 0.8, 0.3, 0.9, 0],
                        clipPath: [
                            "inset(0 0 70% 0)", 
                            "inset(40% 0 0 0)", 
                            "inset(10% 0 60% 0)", 
                            "inset(0 0 0 0)"
                        ]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.05, repeat: Infinity, repeatDelay: 0.2 }}
                    style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        color: 'cyan',
                        opacity: 0.7,
                        zIndex: 1,
                        mixBlendMode: 'screen',
                        width: '100%'
                    }}
                >
                    {baseText}
                </motion.span>
             )}
        </AnimatePresence>
    </motion.span>
  );
};
