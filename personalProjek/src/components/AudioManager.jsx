import React, { useEffect, useRef, useState } from 'react';

const AudioManager = ({ bgmSrc, sfxSrc, entranceSrc, isNavigating, showEntrance }) => {
    const bgmRef = useRef(null);
    const sfxRef = useRef(null);
    const entranceRef = useRef(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    // Initialize & Try Autoplay
    useEffect(() => {
        if(bgmSrc) {
            bgmRef.current = new Audio(bgmSrc);
            bgmRef.current.loop = true;
            bgmRef.current.volume = 0.2;
            // Try autoplay BGM immediately
            bgmRef.current.play().catch(() => {});
        }
        
        if(sfxSrc) {
            sfxRef.current = new Audio(sfxSrc);
            sfxRef.current.volume = 0.5;
        }

        if(entranceSrc) {
            entranceRef.current = new Audio(entranceSrc);
            entranceRef.current.volume = 0.6;
            // Try autoplay Entrance immediately if showing
            if (showEntrance) {
                entranceRef.current.play().catch(() => {});
            }
        }

        return () => {
            if (bgmRef.current) { bgmRef.current.pause(); bgmRef.current = null; }
            if (sfxRef.current) { sfxRef.current = null; }
            if (entranceRef.current) { entranceRef.current = null; }
        };
    }, [bgmSrc, sfxSrc, entranceSrc]);

    // Handle User Interaction (Force Play)
    useEffect(() => {
        const handleInteraction = () => {
            if (!hasInteracted) {
                setHasInteracted(true);
                
                // 1. Play Entrance if still relevant
                if (showEntrance && entranceRef.current && entranceRef.current.paused) {
                     entranceRef.current.play().catch(e => console.log("Entrance play failed:", e));
                }

                // 2. Play BGM immediately (don't wait for entrance to finish)
                if (bgmRef.current && bgmRef.current.paused) {
                    bgmRef.current.play().catch(e => console.log("BGM play failed:", e));
                }
            }
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('keydown', handleInteraction);
        
        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };
    }, [hasInteracted, showEntrance]);

    // Fallback: If BGM wasn't playing and user interacted, ensure it plays
    useEffect(() => {
        if (hasInteracted && bgmRef.current && bgmRef.current.paused) {
            bgmRef.current.play().catch(() => {});
        }
    }, [hasInteracted]);

    // Play SFX on Navigation
    useEffect(() => {
        if (isNavigating && sfxRef.current) {
            sfxRef.current.currentTime = 0;
            sfxRef.current.play().catch(e => console.log("SFX play failed:", e));
        }
    }, [isNavigating]);

    return null; // Invisible component
};

export default AudioManager;
