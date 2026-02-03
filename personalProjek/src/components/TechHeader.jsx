import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RunnableText } from './text/RunnableText';

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
            height: '30px',
            zIndex: 900,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
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
            {/* Left Data */}
            <div className="d-flex gap-2 gap-md-3">
                <span>SYS: <span style={{color: '#fff'}}>NV-01</span></span>
                <span className="d-none d-md-inline">MEM: <span style={{color: '#fff'}}>100%</span></span>
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
