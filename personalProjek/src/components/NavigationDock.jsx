import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { RunnableText } from './text/RunnableText';

const NavigationDock = ({ onNavigate }) => {
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState(null);
  const { t, language, setLanguage } = useLanguage();

  const navItems = [
    { label: t("nav.home"), path: '/', icon: '⌂' },
    { label: t("nav.about"), path: '/about', icon: '?' },
    { label: t("nav.project"), path: '/project', icon: '⚡' },
    { label: t("nav.contact"), path: '/contact', icon: '✉' }
  ];

  return (
    <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none'
    }}>
      {/* Connector Lines (Left & Right) */}
      <div className="d-none d-md-block" style={{
          position: 'absolute', bottom: '25px', left: '0', width: '35%', height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
          opacity: 0.3
      }} />
      <div className="d-none d-md-block" style={{
          position: 'absolute', bottom: '25px', right: '0', width: '35%', height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
          opacity: 0.3
      }} />

      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 30px',
            background: 'rgba(5, 5, 5, 0.90)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 0, 51, 0.4)',
            // Tech Shape: Cut corners
            clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)',
            boxShadow: '0 0 30px rgba(0,0,0,0.9), inset 0 0 20px rgba(255, 0, 51, 0.05)',
            position: 'relative'
        }}
      >
        {/* Decorative Top Bracket */}
        <div style={{
            position: 'absolute', top: -1, left: '30%', width: '40%', height: '2px',
            background: 'var(--color-primary)',
            boxShadow: '0 0 10px var(--color-primary)'
        }} />

        {/* Animated Scanning Grid Background */}
        <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            opacity: 0.1, zIndex: 0,
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 0, 51, .3) 25%, rgba(255, 0, 51, .3) 26%, transparent 27%, transparent 74%, rgba(255, 0, 51, .3) 75%, rgba(255, 0, 51, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 0, 51, .3) 25%, rgba(255, 0, 51, .3) 26%, transparent 27%, transparent 74%, rgba(255, 0, 51, .3) 75%, rgba(255, 0, 51, .3) 76%, transparent 77%, transparent)',
            backgroundSize: '30px 30px'
        }} />

        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isHovered = hoveredPath === item.path;
          
          return (
            <motion.button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              onHoverStart={() => setHoveredPath(item.path)}
              onHoverEnd={() => setHoveredPath(null)}
              layout
              style={{
                  position: 'relative',
                  background: 'transparent',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 14px',
                  borderRadius: '2px', // Tech boxy look
                  cursor: 'pointer',
                  color: isActive ? '#000' : 'var(--color-text-muted)', // Dark text on active
                  zIndex: 2,
                  outline: 'none'
              }}
            >
              {/* Active Background - Neon Rect */}
              {isActive && (
                  <motion.div 
                    layoutId="active-bg"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'var(--color-primary)',
                        clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                        zIndex: -1,
                        boxShadow: '0 0 20px var(--color-primary)'
                    }}
                    transition={{ type: 'spring', duration: 0.6 }}
                  />
              )}

              {/* Icon Container */}
              <motion.span 
                style={{ 
                    fontSize: '18px', 
                    fontWeight: 'bold',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    fontFamily: 'var(--font-mono)'
                }}
                animate={{ scale: isHovered ? 1.15 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                  {item.icon}
                  
                  {/* EXPAND LABEL (Only Active) */}
                  <AnimatePresence mode="popLayout">
                    {isActive && (
                        <motion.span
                            initial={{ width: 0, opacity: 0, x: -10 }}
                            animate={{ width: 'auto', opacity: 1, x: 0 }}
                            exit={{ width: 0, opacity: 0, x: -10 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            style={{ 
                                fontSize: '14px', 
                                fontFamily: 'var(--font-heading)',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                fontWeight: 800,
                                letterSpacing: '1px',
                                textTransform: 'uppercase'
                            }}
                        >
                            <RunnableText text={item.label} />
                        </motion.span>
                    )}
                  </AnimatePresence>
              </motion.span>
              
              {/* Hover Borders */}
              {!isActive && isHovered && (
                  <motion.div 
                    layoutId="hover-border"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'absolute',
                        inset: '2px',
                        border: '1px solid var(--color-primary)',
                        clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                        zIndex: -1,
                        opacity: 0.5
                    }}
                    transition={{ duration: 0.2 }}
                  />
              )}
            </motion.button>
          );
        })}
        
        {/* Divider */}
        <div style={{ width: '1px', height: '24px', background: 'var(--color-text-muted)', opacity: 0.3, margin: '0 8px' }}></div>

        {/* Language Switcher */}
        <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto', zIndex: 10 }}>
            {['en', 'id', 'jp'].map((lang) => (
                <motion.button
                    key={lang}
                    onClick={(e) => {
                         e.stopPropagation(); // Prevent bubbling issues
                         setLanguage(lang);
                    }}
                    whileHover={{ scale: 1.1, color: 'var(--color-primary)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: language === lang ? 'var(--color-primary)' : 'var(--color-text-muted)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px', // Slightly larger
                        fontWeight: 'bold',
                        padding: '6px', // Larger touch area
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        minWidth: '24px' // Ensure minimum click width
                    }}
                >
                    {lang}
                </motion.button>
            ))}
        </div>

      </motion.div>
    </div>
  );
};

export default NavigationDock;
