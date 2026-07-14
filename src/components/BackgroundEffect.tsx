import React, { useEffect, useState, useRef } from 'react';

const MATH_SYMBOLS = [
  '\\nabla f(x) = 0',
  '\\min \\ f(x)',
  'x^* \\in \\Omega',
  '\\int_a^b g(x) dx',
  '\\Sigma_{i=1}^n x_i',
  'A \\in \\mathbb{R}^{m \\times n}',
  '\\lambda_{max}',
  '\\partial f',
  '\\rho(x, y)',
  'w^T x + b = 0',
  '\\mathbb{E}[X]',
  '\\mathcal{H}',
  '\\sigma(W x + b)',
  '\\Phi(x)',
  '\\alpha \\in (0, 1]',
];

interface Particle {
  id: number;
  text: string;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotSpeed: number;
}

export default function BackgroundEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse coordinates for dynamic radial spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize and animate mathematical symbol particles
  useEffect(() => {
    const pCount = 20;
    const initialParticles: Particle[] = Array.from({ length: pCount }).map((_, i) => ({
      id: i,
      text: MATH_SYMBOLS[i % MATH_SYMBOLS.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.7 + Math.random() * 0.6,
      opacity: 0.03 + Math.random() * 0.08,
      speedX: (Math.random() - 0.5) * 0.05,
      speedY: -0.02 - Math.random() * 0.04, // drift upwards
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 0.1,
    }));

    setParticles(initialParticles);

    let animationFrameId: number;
    const update = () => {
      setParticles((prev) =>
        prev.map((p) => {
          let nextY = p.y + p.speedY;
          let nextX = p.x + p.speedX;

          // Recycle particle when it drifts off top
          if (nextY < -10) {
            nextY = 110;
            nextX = Math.random() * 100;
          }
          if (nextX < -10 || nextX > 110) {
            nextX = Math.random() * 100;
          }

          return {
            ...p,
            x: nextX,
            y: nextY,
            rotation: p.rotation + p.rotSpeed,
          };
        })
      );
      animationFrameId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      id="bg-effect-container"
      ref={containerRef}
      className="fixed inset-0 -z-50 overflow-hidden bg-[#020512] transition-colors duration-1000"
    >
      {/* Slow animating abstract gradient orbs in background */}
      <div 
        id="bg-orb-1"
        className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-blue-900/10 blur-[130px] animate-pulse"
        style={{ animationDuration: '15s' }}
      />
      <div 
        id="bg-orb-2"
        className="absolute top-[40%] -right-[10%] h-[70%] w-[60%] rounded-full bg-violet-950/15 blur-[150px] animate-pulse"
        style={{ animationDuration: '20s' }}
      />
      <div 
        id="bg-orb-3"
        className="absolute -bottom-[20%] left-[20%] h-[50%] w-[50%] rounded-full bg-cyan-950/10 blur-[120px] animate-pulse"
        style={{ animationDuration: '12s' }}
      />

      {/* Grid Overlay for technical structure */}
      <div 
        id="bg-grid-overlay"
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px' 
        }}
      />

      {/* Dynamic Cursor Spotlight Interaction */}
      <div
        id="bg-cursor-spotlight"
        className="pointer-events-none absolute h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-blue-500/5 via-violet-500/1 to-transparent blur-[80px]"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />

      {/* Floating mathematical formula particles */}
      <div id="bg-math-particles" className="absolute inset-0 pointer-events-none select-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute font-mono text-[10px] text-blue-300 md:text-xs"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: `scale(${p.scale}) rotate(${p.rotation}deg)`,
              opacity: p.opacity,
              transition: 'opacity 0.5s ease',
            }}
          >
            {p.text}
          </div>
        ))}
      </div>
    </div>
  );
}
