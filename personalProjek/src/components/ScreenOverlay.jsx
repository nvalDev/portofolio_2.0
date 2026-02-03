import React from 'react';
import '../css/ornaments.css';

const ScreenOverlay = () => {
    return (
        <>
            {/* Scanline / Pixel Grid Overlay */}
            <div className="screen-overlay" />
            
            {/* Optional Vignette */}
            <div 
                style={{
                    position: 'fixed',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: 'radial-gradient(circle, transparent 60%, rgba(0,0,0,0.6) 100%)',
                    pointerEvents: 'none',
                    zIndex: 9998
                }} 
            />
        </>
    );
};

export default ScreenOverlay;
