// IMPORTACIONES
import React, { useEffect, useRef } from 'react';

// CONSTANTES
const TAIL_LENGTH = 20;

// COMPONENTE DE REVELACION FLUIDA
export default function FluidSnakeReveal({ children }) {
  // REFERENCIAS Y ESTADOS DEL CANVAS
  const canvasRef = useRef(null);
  const maskContainerRef = useRef(null);
  const containerRef = useRef(null);
  const pointsRef = useRef(Array.from({ length: TAIL_LENGTH }, () => ({ x: -500, y: -500 })));
  const requestRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const isVisibleRef = useRef(true);
  const frameCount = useRef(0);
  const lastMaskUrl = useRef('');

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleResize();
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !requestRef.current) {
          requestRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    if (container) observer.observe(container);

    const animate = () => {
      if (!isVisibleRef.current) {
        requestRef.current = null;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x, y } = mouseRef.current;
      const head = pointsRef.current[0];
      if (x !== -100) {
        head.x += (x - head.x) * 0.2;
        head.y += (y - head.y) * 0.2;
      }

      for (let i = 1; i < TAIL_LENGTH; i++) {
        const prev = pointsRef.current[i - 1];
        const curr = pointsRef.current[i];
        curr.x += (prev.x - curr.x) * 0.25;
        curr.y += (prev.y - curr.y) * 0.25;
      }

      ctx.fillStyle = 'white';
      ctx.beginPath();
      pointsRef.current.forEach((p, i) => {
        const size = Math.max(30, 180 - i * 5);
        ctx.moveTo(p.x + size, p.y);
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      });
      ctx.fill();
      frameCount.current++;
      if (maskContainerRef.current && frameCount.current % 2 === 0) {
        lastMaskUrl.current = canvas.toDataURL();
        maskContainerRef.current.style.maskImage = `url(${lastMaskUrl.current})`;
        maskContainerRef.current.style.webkitMaskImage = `url(${lastMaskUrl.current})`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
      observer.disconnect();
    };
  }, []);

  // RENDERIZADO
  return (
    <div ref={containerRef} className="fluid-reveal-container" style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div
        ref={maskContainerRef}
        style={{
          position: 'absolute',
          inset: 0,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          filter: 'url(#gooey)',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
          opacity: 0.4,
          zIndex: 2
        }}
      >
        {children}
      </div>
    </div>
  );
}
