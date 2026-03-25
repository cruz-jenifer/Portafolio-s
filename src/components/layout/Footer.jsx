// IMPORTACIONES
import React from 'react';

// COMPONENTE PIE DE PAGINA
export default function Footer() {
  // RENDERIZADO
  return (
    <footer id="contacto">
      <div className="fondo-footer">
        <div className="grilla"></div>
        <div className="luz-interactiva" id="luzFooter"></div>
      </div>
      <div className="contenedor-seccion activo">
        <span className="texto-gradiente">CONTACTO</span>
        <p className="subtitulo-contacto">¿TENES UN PROYECTO EN MENTE?</p>
        <p className="subtitulo-contacto">ME ENCANTARIA COLABORAR CONTIGO</p>
        
        <div className="links-contacto">
          <a href="mailto:cruz.jenifer.j@gmail.com" className="link-grande objetivo-hover">EMAIL</a>
          <a href="https://linkedin.com/in/cruz-jenifer" target="_blank" rel="noreferrer" className="link-grande objetivo-hover">LINKEDIN</a>
          <a href="https://github.com/cruz-jenifer" target="_blank" rel="noreferrer" className="link-grande objetivo-hover">GITHUB</a>
        </div>
        
        <div className="copyright">&copy; 2026 JENIFER CRUZ | BA</div>
      </div>
    </footer>
  );
}
