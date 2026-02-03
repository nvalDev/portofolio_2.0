import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { RunnableText } from './text/RunnableText';

const RightHUD = () => {
    const { t } = useLanguage();
    return (
        <div 
            className="d-none d-lg-flex flex-column align-items-end"
            style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: '2%',
                width: '60px',
                padding: '100px 0',
                zIndex: 5,
                pointerEvents: 'none'
            }}
        >
             {/* Top Coordinates */}
             <div style={{ writingMode: 'vertical-rl', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-muted)', letterSpacing: '2px', marginBottom: '20px' }}>
                COORD: 34.0522° N, 118.2437° W
             </div>

             {/* Ruler Markings */}
             <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-end', opacity: 0.5 }}>
                 {Array.from({ length: 10 }).map((_, i) => (
                     <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ fontSize: '9px', color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>0{i}</span>
                        <div style={{ width: i % 2 === 0 ? '20px' : '10px', height: '1px', background: 'var(--color-primary)' }} />
                     </div>
                 ))}
             </div>

             {/* Animated Radar Circle */}
             <div style={{ marginTop: 'auto', position: 'relative', width: '40px', height: '40px' }}>
                 <motion.div 
                     style={{
                         width: '100%', height: '100%',
                         borderRadius: '50%',
                         border: '1px solid var(--color-primary)',
                         opacity: 0.5
                     }}
                     animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.1, 0.5] }}
                     transition={{ duration: 2, repeat: Infinity }}
                 />
                 <motion.div 
                     style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: '4px', height: '4px', background: 'var(--color-primary)',
                        borderRadius: '50%'
                     }}
                 />
                 <div style={{
                     position: 'absolute', top: 0, left: '50%', width: '1px', height: '50%',
                     background: 'linear-gradient(to top, var(--color-primary), transparent)',
                     transformOrigin: 'bottom'
                 }} 
                 className="radar-sweep"
                 />
                 <style dangerouslySetInnerHTML={{__html: `
                    .radar-sweep { animation: sweep 2s linear infinite; }
                    @keyframes sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                 `}} />
             </div>
             
             <div style={{ marginTop: '20px', border: '1px solid var(--color-text-muted)', padding: '2px 5px' }}>
                 <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--color-text-main)' }}><RunnableText text={t('common.modeSecure')} /></span>
             </div>
        </div>
    );
};

export default RightHUD;
