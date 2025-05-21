// src/ParticleTrail.js
import { useEffect, useRef } from 'react';

export default function ParticleTrail() {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function createParticle(x, y) {
      const particle = document.createElement('div');
      const size = 6 + Math.random() * 8;
      const color = [
        'rgba(215,109,119,0.18)', // pink
        'rgba(123,47,242,0.18)',  // purple
        'rgba(196,255,210,0.18)', // green
        'rgba(58,141,222,0.18)',  // blue
        'rgba(255,255,255,0.18)'  // white
      ][Math.floor(Math.random() * 5)];
      particle.style.position = 'fixed';
      particle.style.left = `${x - size / 2}px`;
      particle.style.top = `${y - size / 2}px`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = '50%';
      particle.style.background = color;
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = 99999;
      particle.style.filter = 'blur(2px)';
      particle.style.opacity = '1';
      particle.style.transition = 'opacity 0.7s linear, transform 0.7s linear';
      container.appendChild(particle);
      setTimeout(() => {
        particle.style.opacity = '0';
        particle.style.transform = `scale(${0.5 + Math.random() * 0.7}) translateY(${8 + Math.random() * 12}px)`;
      }, 10);
      setTimeout(() => {
        container.removeChild(particle);
      }, 700);
    }

    function onMove(e) {
      createParticle(e.clientX, e.clientY);
    }
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <div ref={containerRef} style={{position:'fixed',top:0,left:0,right:0,bottom:0,pointerEvents:'none',zIndex:99999}} />;
}
