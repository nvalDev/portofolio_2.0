import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { inSphere } from 'maath/random';
import * as THREE from 'three';

const ParticleField = (props) => {
  const ref = useRef();
  
  // Create two layers of particles:
  // 1. Fine Dust: High count, small size, subtle movement
  const dustSphere = useMemo(() => inSphere(new Float32Array(8000), { radius: 2 }), []);
  
  // 2. Data Cinders: Low count, larger glow, faster movement
  const cinderSphere = useMemo(() => inSphere(new Float32Array(500), { radius: 1.5 }), []);

  useFrame((state, delta) => {
    // Advanced Rotation: Different speeds for depth perception
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 25;
    
    // Pulse Effect: Subtle scaling based on time
    const pulse = Math.sin(state.clock.elapsedTime * 0.5) * 0.05 + 1;
    ref.current.scale.set(pulse, pulse, pulse);
  });

  return (
    <group ref={ref} rotation={[0, 0, Math.PI / 4]}>
      {/* Layer 1: Fine Dust (Atmosphere) */}
      <Points positions={dustSphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#aa0000" // Darker red for depth
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
      
      {/* Layer 2: Glowing Cinders (Focus) */}
      <Points positions={cinderSphere} stride={3} frustumCulled={false} {...props}>
          <PointMaterial
            transparent
            color="#ff4444" // Bright signal red
            size={0.015} // Much larger
            sizeAttenuation={true}
            depthWrite={false}
            opacity={0.8}
            blending={THREE.AdditiveBlending} // Glow effect
          />
      </Points>
    </group>
  );
};

const MouseParallax = () => {
    // Add subtle camera movement based on mouse
    useFrame((state) => {
        const { mouse, camera } = state;
        // Smooth lerp for professional feel
        camera.position.x += (mouse.x * 0.2 - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * 0.2 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
    });
    return null;
}

const BackgroundCanvas = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none', background: '#050505' }}>
      <Canvas 
        camera={{ position: [0, 0, 1.2], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]} // Handle high-DPI screens
      >
        <MouseParallax /> {/* Interactive Camera */}
        <ParticleField />
        
        {/* Dynamic Fog for Depth */}
        <fog attach="fog" args={['#050505', 0.5, 2.5]} />
      </Canvas>
      
      {/* Vignette Overlay for Cinematic Focus */}
      <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          background: 'radial-gradient(circle at center, transparent 0%, #000 120%)'
      }} />
      
      {/* Digital Noise Texture (Simulates camera sensor) */}
       <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          pointerEvents: 'none'
      }} />
    </div>
  );
};

export default BackgroundCanvas;
