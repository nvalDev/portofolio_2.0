import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RunnableText } from './text/RunnableText';
import logoImg from '../assets/LOGO-NVALDEVVVV.jpg';
import { motion } from 'framer-motion';

const TechHeader = () => {
    const { t } = useLanguage();
    const [time, setTime] = useState("");
    const [randomVal, setRandomVal] = useState("00.000");

    useEffect(() => {
        const update = () => {
             const now = new Date();
             setTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`);
             setRandomVal((Math.random() * 100).toFixed(3));
        };
        const timer = setInterval(update, 1000);
        update();
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '40px', // Slightly taller for logo
            zIndex: 900,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--color-primary)',
            pointerEvents: 'none',
            borderBottom: '1px solid rgba(255, 0, 51, 0.1)'
        }}>
            {/* Left Data & LOGO */}
            <div className="d-flex align-items-center gap-3" style={{pointerEvents: 'auto'}}>
                 <motion.div 
                    className="position-relative"
                    style={{ width: '30px', height: '30px', overflow: 'hidden', border: '1px solid var(--color-primary)' }}
                    whileHover={{ scale: 1.2, borderColor: '#fff' }}
                 >
                    <motion.img 
                        src={logoImg} 
                        alt="NVALDEV Logo" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        initial={{ filter: 'grayscale(100%)' }}
                        whileHover={{ filter: 'grayscale(0%)' }}
                    />
                    {/* Scan effect */}
                    <motion.div 
                        style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '2px',
                            background: 'rgba(255,255,255,0.8)', boxShadow: '0 0 5px white'
                        }}
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                 </motion.div>
                <div className="d-flex flex-column justify-content-center" style={{lineHeight: '1'}}>
                    <span style={{fontWeight: 'bold', fontSize: '12px', color: '#fff', letterSpacing: '1px'}}>NVALDEV</span>
                    <span style={{fontSize: '9px', opacity: 0.7}}>SYS: ONLINE</span>
                </div>
            </div>

            {/* Center Data - Hidden on very small screens, simplified on mobile */}
            <div className="d-none d-sm-flex gap-2 gap-md-4 align-items-center">
                  <div className="d-none d-md-block" style={{ width: '100px', height: '2px', background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '30%', height: '100%', background: 'var(--color-primary)' }} />
                  </div>
                  <span style={{letterSpacing: '1px', fontSize: '9px'}}><RunnableText text={t('common.protocolSecure')} /></span>
                  <div className="d-none d-md-block" style={{ width: '100px', height: '2px', background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 0, right: 0, width: '30%', height: '100%', background: 'var(--color-primary)' }} />
                  </div>
            </div>

            {/* Right Data */}
            <div className="d-flex gap-2 gap-md-3 text-end">
                <span className="d-none d-md-inline">VAL: <span style={{color: '#fff'}}>{randomVal}</span></span>
                <span>T: <span style={{color: '#fff'}}>{time}</span></span>
            </div>
        </div>
    );
};

export default TechHeader;
