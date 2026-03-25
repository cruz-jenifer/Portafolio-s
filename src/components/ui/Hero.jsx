// IMPORTACIONES
import React, { useRef, useEffect, useCallback, useState } from 'react';
import FluidSnakeReveal from './FluidSnakeReveal';
import LetterGlitch from './LetterGlitch';

// COMPONENTE PRINCIPAL
export default function Hero() {
  // REFERENCIAS Y ESTADOS
  const heroRef = useRef(null);
  const baseRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const [hasMoved, setHasMoved] = useState(false);

  // FUNCIONES DE ANIMACION
  const updateParallax = useCallback(() => {
    const { x, y } = mouseRef.current;
    if (x === -100) return;

    const moveX = (x - window.innerWidth / 2) / 50;
    const moveY = (y - window.innerHeight / 2) / 50;

    if (baseRef.current) {
      baseRef.current.style.transform = `translate3d(${moveX * -1.2}px, ${moveY * -1.2}px, 0)`;
    }
    if (titleRef.current) {
      titleRef.current.style.transform = `translate3d(${moveX * 0.5}px, ${moveY * 0.5}px, 0)`;
      if (!hasMoved) {
        setHasMoved(true);
        titleRef.current.classList.add('expandido');
      }
    }
    if (subtitleRef.current) {
      subtitleRef.current.style.transform = `translate3d(${moveX * 0.3}px, ${moveY * 0.3}px, 0)`;
    }
  }, [hasMoved]);

  // EFECTOS SECUNDARIOS
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [updateParallax]);

  // RENDERIZADO
  return (
    <section className="hero objetivo-hover" id="inicio" ref={heroRef}>
      <div
        ref={baseRef}
        className="fondo-base parallax"
        style={{
          position: 'absolute',
          inset: '-50px',
          backgroundImage: 'url("/img/img2.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1,
          willChange: 'transform'
        }}
      ></div>

      <FluidSnakeReveal>
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={false}
          smooth={false}
          glitchColors={['#6c44efff', '#c4dee8', '#FA441D']}
        />
      </FluidSnakeReveal>

      <div className="contenido-hero">
        <h1
          ref={titleRef}
          className={`titulo-hero ${hasMoved ? 'expandido' : ''}`}
          id="tituloDinamico"
        >
          {hasMoved ? (
            <>FULL<br />STACK<br />DEV.</>
          ) : 'PORTAFOLIO'}
        </h1>
        <p ref={subtitleRef} className="subtitulo-hero">INGENIERÍA & CÓDIGO</p>

        <div className="selector-idioma en-hero objetivo-hover">
          <div className="globo-3d">
            <div className="anillo"></div>
            <div className="anillo"></div>
            <div className="anillo"></div>
          </div>
          <div className="etiqueta-idioma">ES / EN</div>
          <div className="opciones-idioma">
            <span className="btn-idioma activo" data-lang="es">ES</span>|
            <span className="btn-idioma" data-lang="en">EN</span>
          </div>
        </div>
      </div>
      <a href="#perfil" className="scroll-down objetivo-hover" aria-label="Ir abajo">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </a>
    </section>
  );
}
