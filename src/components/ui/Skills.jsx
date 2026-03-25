// IMPORTACIONES
import React, { useEffect, useRef } from 'react';

// COMPONENTE TARJETA DE HABILIDAD
const SkillCard = ({ title, img, type, colorClass, whiteIcon }) => {
  // REFERENCIAS Y EVENTOS
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / 20;
    const y = (e.clientY - r.top - r.height / 2) / 20;
    
    const imgs = cardRef.current.querySelectorAll("img, .contenido-tarjeta");
    for (let i of imgs) i.style.transform = `translate3d(${x}px,${y}px,0) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const imgs = cardRef.current.querySelectorAll("img, .contenido-tarjeta");
    for (let i of imgs) i.style.transform = "";
  };

  // RENDERIZADO DE TARJETA
  return (
    <div 
      className="tarjeta-archivo tilt" 
      ref={cardRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
    >
      <div className="fondo-overlay"></div>
      <div className="contenido-tarjeta">
        <div className={`caja-icono-3d ${whiteIcon ? 'icono-blanco' : ''}`}>
          <img src={img} alt={title} />
        </div>
        <div className="detalles-tech">
          <span className="id-tech">{type}</span>
          <span className="nombre-tech">{title}</span>
        </div>
      </div>
    </div>
  );
};

// COMPONENTE PRINCIPAL DE HABILIDADES
export default function Skills() {
  // RENDERIZADO GLOBAL
  return (
    <section id="skills">
      <div className="contenedor-seccion activo">
        <span className="texto-gradiente">HABILIDADES TÉCNICAS</span>

        <div className="grilla-track">
          
          <div className="columna-track tema-cyan">
            <h3 className="titulo-columna glow-texto">FRONTEND <span className="hash">#UI</span></h3>
            <div className="wrapper-tarjetas">
              <SkillCard title="REACT" type="LIBRARY" img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
              <SkillCard title="REDUX" type="STATE" img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg" />
              <SkillCard title="TYPESCRIPT" type="LANG" img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
              <SkillCard title="HTML5" type="CORE" img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" />
              <SkillCard title="CSS3" type="STYLE" img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" />
              <SkillCard title="BOOTSTRAP" type="UI" img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" />
            </div>
          </div>

          <div className="columna-track tema-morado">
            <h3 className="titulo-columna glow-texto">BACKEND <span className="hash">#OPS</span></h3>
            <div className="wrapper-tarjetas">
              <SkillCard title="NODE.JS" type="RUN" img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" />
              <SkillCard title="EXPRESS" type="API" img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" whiteIcon={true} />
              <SkillCard title="MYSQL" type="SQL" img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" />
              <SkillCard title="MONGODB" type="NOSQL" img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" />
              <SkillCard title="REST API" type="HTTP" img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/insomnia/insomnia-original.svg" />
            </div>
          </div>

          <div className="columna-track tema-tomate">
            <h3 className="titulo-columna glow-texto">TOOLS <span className="hash">#DEV</span></h3>
            <div className="wrapper-tarjetas">
              <SkillCard title="C ANSI" type="LOW" img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" />
              <SkillCard title="JAVASCRIPT" type="ES6+" img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
              <SkillCard title="GIT" type="GIT" img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" />
              <SkillCard title="GITHUB" type="REPO" img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" whiteIcon={true} />
              <SkillCard title="LINUX" type="OS" img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" />
              <SkillCard title="VS CODE" type="IDE" img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
