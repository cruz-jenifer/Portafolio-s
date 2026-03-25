// IMPORTACIONES
import React from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../../data/projects';

// COMPONENTE PRINCIPAL DE PROYECTOS
export default function Projects() {
  // RENDERIZADO
  return (
    <section id="proyectos">
      <div className="contenedor-seccion activo">
        <span className="texto-gradiente">TRABAJOS</span>
        <h2 className="titulo-grande">PROYECTOS</h2>

        {projects.map((proj, idx) => (
          <ProjectCard 
            key={proj.id} 
            project={proj} 
            alignRight={idx % 2 !== 0} 
          />
        ))}

      </div>
    </section>
  );
}
