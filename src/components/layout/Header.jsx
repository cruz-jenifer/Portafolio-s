// IMPORTACIONES
import React, { useState, useEffect, useRef } from 'react';
import GooeyNav from '../ui/GooeyNav';

// COMPONENTE ENCABEZADO
export default function Header() {
  // ESTADOS DEL COMPONENTE
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const sections = ['inicio', 'perfil', 'proyectos', 'skills', 'contacto'];

  // EFECTOS SECUNDARIOS
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollPos = window.scrollY + 250;
      
      sections.forEach((id, index) => {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveIndex(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavChange = (index) => {
    setActiveIndex(index);
    isScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000); 
  };

  // MANEJADORES DE EVENTOS
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLangToggle = (lang) => {
    setIsEnglish(lang === 'en');
  };

  // RENDERIZADO
  return (
    <>
      <header>
        <a href="#" className="logo objetivo-hover">JENIFER<span>CRUZ</span></a>
        
        <div className="nav-derecha">
          <nav className="nav-desktop">
            <GooeyNav 
              items={[
                { label: "INICIO", href: "#inicio" },
                { label: "PERFIL", href: "#perfil" },
                { label: "PROYECTOS", href: "#proyectos" },
                { label: "HABILIDADES", href: "#skills" },
                { label: "CONTACTO", href: "#contacto" },
              ]}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={200}
              activeIndex={activeIndex}
              onChange={handleNavChange}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </nav>
          
          <a href="/img/CV_Jenifer_Cruz_Junior_IT.pdf" download="CV_Jenifer_Cruz.pdf" target="_blank" rel="noreferrer" className="btn-cv-header objetivo-hover">CV</a>
          
          <div className="boton-menu objetivo-hover" onClick={toggleMenu}>
            <div className="barra"></div>
            <div className="barra"></div>
            <div className="barra"></div>
          </div>
        </div>
      </header>

      <div className={`menu-overlay ${menuOpen ? 'abierto' : ''}`}>
        <div className="contenido-menu">
          <h2 className="texto-gradiente">MENÚ</h2>
          <nav className="navegacion">
            <a href="#inicio" className="link-menu objetivo-hover" onClick={toggleMenu}>INICIO</a>
            <a href="#perfil" className="link-menu objetivo-hover" onClick={toggleMenu}>PERFIL</a>
            <a href="#proyectos" className="link-menu objetivo-hover" onClick={toggleMenu}>PROYECTOS</a>
            <a href="#skills" className="link-menu objetivo-hover" onClick={toggleMenu}>HABILIDADES</a>
            <a href="#contacto" className="link-menu objetivo-hover" onClick={toggleMenu}>CONTACTO</a>
          </nav>
          
          <div className="selector-idioma en-menu objetivo-hover">
            <div className="globo-3d">
              <div className="anillo"></div>
              <div className="anillo"></div>
              <div className="anillo"></div>
            </div>
            <div className="etiqueta-idioma">ES / EN</div>
            <div className="opciones-idioma">
              <span className={`btn-idioma ${!isEnglish ? 'activo' : ''}`} onClick={() => handleLangToggle('es')}>ES</span>|
              <span className={`btn-idioma ${isEnglish ? 'activo' : ''}`} onClick={() => handleLangToggle('en')}>EN</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
