import React from 'react';
import { motion } from 'framer-motion';
import '../css/ornaments.css';

const CyberCard = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div 
      className={`cyber-card ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: delay }}
      viewport={{ once: true }}
      style={{ position: 'relative', background: 'var(--color-surface)', overflow: 'hidden' }}
    >
      {/* Corner Brackets */}
      <div className="corner-bracket top-left"></div>
      <div className="corner-bracket top-right"></div>
      <div className="corner-bracket bottom-left"></div>
      <div className="corner-bracket bottom-right"></div>

      {/* Scanning Line - Infinite Loop */}
      <motion.div 
        className="scan-line"
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Content */}
      <div className="content-wrapper" style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>

      {/* Decorative 'Data' marks */}
      <div className="tech-mark mark-top">SYS_RDY</div>
      <div className="tech-mark mark-bottom">0010110</div>
    </motion.div>
  );
};

export default CyberCard;
