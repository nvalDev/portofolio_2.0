import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RunnableText } from './text/RunnableText';
import '../css/entrance.css';
import logoImg from '../assets/LOGO-NVALDEVVVV.jpg';

const EntranceScreen = ({ onComplete }) => {
    const { t } = useLanguage();
    // Phases: 'waiting' -> 'boot' -> 'decoding' -> 'unlock' -> 'opening' -> 'finished'
    const [phase, setPhase] = useState('waiting');
    const [decodeText, setDecodeText] = useState('');
    const [loadPercent, setLoadPercent] = useState(0);
    
    // Random techno-babble for effect
    const messages = [
        t('entrance.systemCheck'),
        t('entrance.biosVerified'), 
        t('entrance.neuralLink'), 
        t('entrance.memAlloc')
    ];
    const [currentSysMsg, setCurrentSysMsg] = useState('');

    useEffect(() => {
        // Initialize message after translation is ready
        setCurrentSysMsg(messages[0]);
    }, []); // Run once on mount to set initial msg

    const rawTarget = t('entrance.accessGranted');
    const TARGET_TEXT = rawTarget.includes('|') ? rawTarget.split('|')[0] : rawTarget; // Strip furigana for split effect
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&";

    useEffect(() => {
        // --- PHASE 1: BOOT & LOAD ---
        if (phase === 'boot') {
            let p = 0;
            const interval = setInterval(() => {
                p += Math.random() * 4;
                if (p >= 100) {
                    p = 100;
                    clearInterval(interval);
                    setPhase('decoding');
                }
                setLoadPercent(Math.floor(p));
                
                // Flash random system messages
                if (Math.random() > 0.8) {
                    setCurrentSysMsg(messages[Math.floor(Math.random() * messages.length)]);
                }
            }, 30); // Fast load
            return () => clearInterval(interval);
        }

        // --- PHASE 2: DECODING TEXT ---
        if (phase === 'decoding') {
            let iterations = 0;
            const interval = setInterval(() => {
                setDecodeText(prev => 
                    TARGET_TEXT.split("").map((letter, index) => {
                        if (index < iterations) {
                            return TARGET_TEXT[index];
                        }
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    }).join("")
                );

                if (iterations >= TARGET_TEXT.length) { 
                    clearInterval(interval);
                    setTimeout(() => setPhase('unlock'), 600); // Hold for a moment
                }
                iterations += 1/3; // Slow down the reveal slightly
            }, 30);
            return () => clearInterval(interval);
        }

        // --- PHASE 3: UNLOCK MECHANISM ---
        if (phase === 'unlock') {
            // Mechanical clank delay
            const timer = setTimeout(() => {
                setPhase('opening');
            }, 800); // Wait for teeth to retract (css animation time)
            return () => clearTimeout(timer);
        }

        // --- PHASE 4: OPEN GATES ---
        if (phase === 'opening') {
            const timer = setTimeout(() => {
                setPhase('finished');
                if (onComplete) onComplete();
            }, 1200); // Wait for gate slide
            return () => clearTimeout(timer);
        }

    }, [phase, onComplete]);

    if (phase === 'finished') return null;

    return (
        <div className="entrance-container">
            <div className="entrance-scanlines"></div>

            {/* WAITING PHASE - CLICK TO START */}
            {phase === 'waiting' && (
                <div 
                    className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{zIndex: 100, cursor: 'pointer', background: 'rgba(0,0,0,0.8)'}}
                    onClick={() => setPhase('boot')}
                >
                    <div className="text-center blink-anim d-flex flex-column align-items-center">
                        <img 
                            src={logoImg} 
                            style={{
                                width: '80px', 
                                height: '80px', 
                                border: '1px solid var(--color-primary)', 
                                padding: '5px',
                                marginBottom: '20px',
                                filter: 'grayscale(100%)',
                                boxShadow: '0 0 15px var(--color-primary)'
                            }}
                            alt="Logo"
                        />
                        <div style={{
                            border: '1px solid var(--color-primary)', 
                            padding: '15px 30px', 
                            color: 'var(--color-primary)',
                            fontFamily: 'var(--font-mono)',
                            letterSpacing: '4px',
                            background: 'rgba(255, 0, 51, 0.1)',
                            boxShadow: '0 0 20px rgba(255, 0, 51, 0.3)'
                        }}>
                           [ INITIALIZE SYSTEM ]
                        </div>
                        <small style={{color: '#666', marginTop: '10px', display: 'block', letterSpacing: '2px'}}>
                            CLICK TO START // AUDIO ENABLED
                        </small>
                    </div>
                </div>
            )}

            {/* TOP GATE */}
            <div className={`entrance-gate gate-top ${phase === 'opening' ? 'gate-open-top' : ''}`}>
                <div className={`gate-lock-tooth tooth-top ${phase === 'unlock' || phase === 'opening' ? 'tooth-unlock-top' : ''}`}></div>
                <div className="sys-detail sys-tl">
                    <RunnableText text={t('entrance.coreOnline')} /><br/>
                    <RunnableText text={t('entrance.secureBoot')} />
                </div>
            </div>

            {/* BOTTOM GATE */}
            <div className={`entrance-gate gate-bottom ${phase === 'opening' ? 'gate-open-bottom' : ''}`}>
               <div className={`gate-lock-tooth tooth-bottom ${phase === 'unlock' || phase === 'opening' ? 'tooth-unlock-bottom' : ''}`}></div>
                <div className="sys-detail sys-br">
                    V.2.0.45<br/>
                    <RunnableText text={currentSysMsg} /> ...
                </div>
            </div>

            {/* CENTER HUD - Only visible before gates open fully */}
            <div className={`entrance-content ${phase === 'opening' ? 'entrance-fade-out' : ''}`} 
                 style={{opacity: (phase === 'opening' || phase === 'waiting') ? 0 : 1, transition: 'opacity 0.3s'}}>
                
                {phase === 'boot' && (
                    <div className="hud-loader">
                        <div className="hud-circle c1"></div>
                        <div className="hud-circle c2"></div>
                        <div className="hud-circle c3"></div>
                        <div className="hud-data-stream">
                            LOAD {loadPercent}%
                        </div>
                    </div>
                )}

                {phase === 'decoding' && (
                    <div className="glitch-text" data-text={decodeText}>
                        {decodeText}
                    </div>
                )}
                
                {phase === 'unlock' && (
                    <div className="glitch-text" data-text={TARGET_TEXT} style={{color: '#fff'}}>
                        {TARGET_TEXT}
                    </div>
                )}

                <div className="tech-typing">
                    {phase === 'boot' ? <RunnableText text={t('entrance.initializing')} /> : ""}
                    {phase === 'decoding' ? <RunnableText text={t('entrance.decrypting')} /> : ""}
                    {phase === 'unlock' ? <RunnableText text={t('entrance.authorized')} /> : ""}
                </div>

            </div>
        </div>
    );
};

export default EntranceScreen;
