// IMPORTACIONES
import React, { useState, useRef, useEffect, useCallback, memo } from 'react';

// SUBCOMPONENTE DE INFORMACION
const ProjectInfo = memo(({ project, className }) => (
  <div className={className}>
    <h3 className="titulo-proyecto">{project.title}</h3>
    <p className="aparecer visible" dangerouslySetInnerHTML={{ __html: project.descEs }}></p>
    {project.detailsEs && (
      <p className="aparecer visible d1" style={{ marginTop: '10px', fontSize: '0.9em', opacity: 0.8 }} dangerouslySetInnerHTML={{ __html: project.detailsEs }}></p>
    )}
    <div className="etiquetas aparecer">
      {project.tags.map(tag => <span key={tag}>{tag}</span>)}
    </div>
    <div className="contenedor-btns visible">
      {project.link && (
        <a href={project.link} target="_blank" rel="noreferrer" className="btn-llamativo objetivo-hover">
          <span className="texto-btn">{project.linkText}</span><span className="icono-btn">→</span>
        </a>
      )}
      {project.githubLink && (
        <a href={project.githubLink} target="_blank" rel="noreferrer" className="btn-llamativo repo objetivo-hover">
          <span className="texto-btn">REPOSITORIO</span><span className="icono-btn">→</span>
        </a>
      )}
    </div>
  </div>
));

// COMPONENTE TARJETA DE PROYECTO
export default function ProjectCard({ project, alignRight }) {
  // ESTADOS Y REFERENCIAS
  const [activeSlide, setActiveSlide] = useState(0);
  const cardRef = useRef(null);
  const tiltRef = useRef({ x: 0, y: 0 });
  const scrollYRef = useRef(0);
  const isHoveredRef = useRef(false);
  const trackRef = useRef(null);
  const imgsRef = useRef([]);
  const rafRef = useRef(null);

  // MANEJO DE ANIMACION Y RENDIMIENTO
  const updateVisuals = useCallback(() => {
    if (!trackRef.current) return;
    const { x, y } = tiltRef.current;
    const hovered = isHoveredRef.current;
    const scale = hovered ? 1.02 : 1;
    trackRef.current.style.transform = `translateX(-${activeSlide * 100}%) translate3d(${x}px, ${y}px, 0) scale(${scale})`;

    imgsRef.current.forEach(img => {
      if (!img) return;
      const offset = hovered ? 0 : (scrollYRef.current - (cardRef.current?.offsetTop || 0)) * 0.03;
      img.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
  }, [activeSlide]);

  // EFECTOS SECUNDARIOS Y EVENTOS DE SCROLL
  useEffect(() => {
    const handleScroll = () => {
      if (!isHoveredRef.current) {
        scrollYRef.current = window.scrollY;
        updateVisuals();
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateVisuals]);
  useEffect(() => {
    updateVisuals();
  }, [activeSlide, updateVisuals]);

  // MANEJADORES DE INTERACCION DEL USUARIO
  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect();
    tiltRef.current = {
      x: (e.clientX - rect.left - rect.width / 2) / 20,
      y: (e.clientY - rect.top - rect.height / 2) / 20
    };
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        updateVisuals();
        rafRef.current = null;
      });
    }
  }, [updateVisuals]);

  const handleMouseLeave = useCallback(() => {
    tiltRef.current = { x: 0, y: 0 };
    isHoveredRef.current = false;
    updateVisuals();
  }, [updateVisuals]);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    updateVisuals();
  }, [updateVisuals]);

  const handleNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % project.images.length);
  }, [project.images.length]);

  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + project.images.length) % project.images.length);
  }, [project.images.length]);

  // RENDERIZADO
  return (
    <article className={`tarjeta-proyecto ${alignRight ? 'derecha' : ''}`}>
      {alignRight && <ProjectInfo project={project} className="info-proyecto izquierda" />}

      <div
        className="visor-proyecto objetivo-hover tilt"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="track-imagenes"
          ref={trackRef}
        >
          {project.images.map((img, i) => (
            <div className="slide" key={i}>
              <img
                src={`/${img}`}
                alt={`${project.title} - img ${i + 1}`}
                className="img-scroll"
                loading="lazy"
                ref={el => imgsRef.current[i] = el}
              />
            </div>
          ))}
        </div>
        <button className="nav-btn prev objetivo-hover" onClick={handlePrev}>&#10094;</button>
        <button className="nav-btn next objetivo-hover" onClick={handleNext}>&#10095;</button>
        <div className="puntos">
          {project.images.map((_, i) => (
            <div key={i} className={`punto ${i === activeSlide ? 'activo' : ''}`} onClick={() => setActiveSlide(i)}></div>
          ))}
        </div>
      </div>

      {!alignRight && <ProjectInfo project={project} className="info-proyecto" />}
    </article>
  );
}
