import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const LeftHUD = () => {
    const { language, setLanguage, t } = useLanguage();
    // Generate some random hex codes for visual "data"
    const dataLines = Array.from({ length: 15 }).map((_, i) => 
        `0x${Math.floor(Math.random()*16777215).toString(16).toUpperCase().padStart(6, '0')}`
    );

    return (
        <div 
            className="d-none d-lg-flex flex-column justify-content-between align-items-center"
            style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: '2%',
                width: '60px',
                padding: '100px 0',
                borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 5,
                pointerEvents: 'none'
            }}
        >
            {/* Top Indicator */}
            <div className="d-flex flex-column align-items-center gap-2">
                <motion.div 
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                        width: '10px', height: '10px',
                        background: 'var(--color-primary)',
                        borderRadius: '50%',
                        boxShadow: '0 0 10px var(--color-primary)'
                    }}
                />
                <span style={{ 
                    writingMode: 'vertical-rl', 
                    color: 'var(--color-primary)', 
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '2px',
                    transform: 'rotate(180deg)'
                }}>
                    {t('common.liveFeed')}
                </span>
            </div>

            {/* Middle Data Column */}
            <div style={{ overflow: 'hidden', height: '40%', opacity: 0.5 }}>
                <motion.div
                    animate={{ y: [0, -100] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px'
                    }}
                >
                    {[...dataLines, ...dataLines].map((line, i) => (
                        <span key={i} style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '9px',
                            color: 'var(--color-text-muted)',
                            whiteSpace: 'nowrap'
                        }}>
                            {line}
                        </span>
                    ))}
                </motion.div>
            </div>



            {/* Bottom Rotating Element */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{
                    width: '40px',
                    height: '40px',
                    border: '1px dashed var(--color-text-muted)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <div style={{ width: '80%', height: '80%', border: '1px solid var(--color-primary)', borderRadius: '50%', opacity: 0.5 }} />
            </motion.div>
        </div>
    );
};

export default LeftHUD;
