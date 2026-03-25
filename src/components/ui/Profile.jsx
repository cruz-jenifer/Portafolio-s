// IMPORTACIONES
import React from 'react';

// COMPONENTE PERFIL
export default function Profile() {
  // RENDERIZADO
  return (
    <section id="perfil">
      <div className="contenedor-seccion activo">
        <span className="texto-gradiente">PERFIL PROFESIONAL</span>
        <div className="grilla-perfil">
          <div className="info-texto">
            <div className="bloque-texto">
              <p className="aparecer visible descripcion">
                Combino la rigurosidad de la <strong>Ingeniería Informática</strong> con la agilidad del desarrollo web moderno. Especializada en <strong>Stack MERN</strong> y soluciones escalables.
              </p>
              <br />
              <p className="aparecer visible d1 descripcion">
                Mi enfoque no solo es escribir codigo, si no diseñar <strong>software de calidad</strong>, priorizando arquitectura y eficiencia técnica.
              </p>
              <br />
              <p className="aparecer visible d2 descripcion">
                Abordo proyectos con mirada crítica sobre gestion datos y diseño de sistemas.
              </p>
            </div>
            <div className="aparecer visible d4">
              <a href="/img/CV_Jenifer_Cruz_Junior_IT.pdf" download="CV_Jenifer_Cruz.pdf" target="_blank" rel="noreferrer" className="boton-cv objetivo-hover">DESCARGAR CV</a>
            </div>
            
            <div className="lista-educacion">
              <h3 className="titulo-edu aparecer visible">EDUCACIÓN</h3>
              
              <div className="item-edu aparecer visible objetivo-hover d1">
                <span className="fecha">MAR 2022 – PRESENTE</span>
                <h4>Ingeniería en Informática</h4>
                <p className="institucion">UNLaM</p>
                <div className="badge">Estado: Avanzado</div>
              </div>
              
              <div className="item-edu aparecer visible objetivo-hover d2">
                <span className="fecha">JUN 2025 – FEB 2026</span>
                <h4>Diplomatura Web Full Stack</h4>
                <p className="institucion">UTN FRBA</p>
                <div className="badge">Stack MERN Intensivo</div>
              </div>
            </div>
            
          </div>
          
          <div className="imagen-perfil objetivo-hover tilt" id="fotoPerfil">
            <img src="/img/img6.jpg" alt="Jenifer" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
