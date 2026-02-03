import { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScrollManager = () => {
    useEffect(() => {
        const scrollContainer = document.querySelector('.main-content');
        
        if (!scrollContainer) return;

        // Initialize Lenis for the specific container
        // Initialize Lenis globally
        const lenis = new Lenis({
            duration: 1.2, // Standard "Luxurious" Smoothness
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 0.8, // "Sedikit lambat" (Slower input for heavier feel)
            smoothTouch: false,
            touchMultiplier: 2,
        });

        console.log("Lenis Smooth Scroll Initialized on .main-content");

        // Request Animation Frame Loop
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return null; // This component renders nothing, just handles logic
};

export default SmoothScrollManager;
