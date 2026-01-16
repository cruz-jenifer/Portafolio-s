/* ------------ CACHE DOM ------------ */
const dom = {
  cursorInt: document.querySelector(".cursor-interno"),
  cursorExt: document.querySelector(".cursor-externo"),
  globos: document.querySelectorAll(".selector-idioma"),
  parallax: document.querySelectorAll(".parallax"),
  scrollImg: document.querySelectorAll(".img-scroll"),
  footer: document.querySelector("#contacto"),
  luzFooter: document.querySelector("#luzFooter"),
  cargador: document.querySelector(".cargador"),
  tilt: document.querySelectorAll(".tilt"),
  fotoPerfil: document.querySelector("#fotoPerfil"),
  menu: document.querySelector(".menu-overlay"),
  cuerpo: document.body,
  tituloHero: document.querySelector("#tituloDinamico"),
  traducibles: document.querySelectorAll("[data-en]")
};

/* ------------ ESTADO ------------ */
const estado = { mouseX: 0, mouseY: 0, scrollY: 0, moviendo: 0, scrolleando: 0, esIngles: false };
const esTactil = "ontouchstart" in window || navigator.maxTouchPoints > 0;

/* ------------ INICIALIZAR ------------ */
window.addEventListener("load", () => {
  dom.traducibles.forEach(el => el.dataset.es = el.innerHTML);
  setTimeout(() => dom.cargador.classList.add("oculto"), 1000);
});

/* ------------ EVENTOS GLOBALES ------------ */
document.addEventListener("click", e => {
  const t = e.target;

  // MENU HAMBURGUESA
  if (t.closest('[data-accion="abrirMenu"]')) {
    dom.menu.classList.toggle("abierto");
    dom.cuerpo.classList.toggle("menu-abierto");
  }

  // CAMBIO DE IDIOMA
  if (t.classList.contains("btn-idioma")) {
    const lang = t.dataset.lang;
    if ((lang === 'en') !== estado.esIngles) {
      estado.esIngles = lang === 'en';
      dom.traducibles.forEach(el => el.innerHTML = estado.esIngles ? el.dataset.en : el.dataset.es);
      document.querySelectorAll(".btn-idioma").forEach(b => b.classList.toggle("activo", b.dataset.lang === lang));
    }
  }

  // CARRUSEL PROYECTOS
  if (t.closest(".nav-btn") || t.classList.contains("punto")) {
    e.stopPropagation();
    const tarjeta = t.closest(".tarjeta-proyecto");
    const track = tarjeta.querySelector(".track-imagenes");
    const total = track.children.length;
    let idx = parseInt(tarjeta.dataset.indice || 0);

    if (t.dataset.accion === "siguiente") idx = (idx + 1) % total;
    else if (t.dataset.accion === "anterior") idx = (idx - 1 + total) % total;
    else if (t.classList.contains("punto")) idx = parseInt(t.dataset.k);

    tarjeta.dataset.indice = idx;
    track.style.transform = `translateX(-${idx * 100}%)`;
    tarjeta.querySelectorAll(".punto").forEach((p, i) => p.classList.toggle("activo", i === idx));
  }
});

/* ------------  ------------ */
if (!esTactil) {
  document.addEventListener("mousemove", e => {
    estado.mouseX = e.clientX;
    estado.mouseY = e.clientY;
    if (!estado.moviendo) {
      estado.moviendo = true;
      requestAnimationFrame(renderizarCursor);
    }
  }, { passive: true });

  window.addEventListener("scroll", () => {
    estado.scrollY = window.scrollY;
    if (!estado.scrolleando) {
      estado.scrolleando = true;
      requestAnimationFrame(renderizarScroll);
    }
  }, { passive: true });

  // TILT EFECTO (OPTIMIZADO)
  dom.tilt.forEach(c => {
    c.onmousemove = e => {
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / 20;
      const y = (e.clientY - r.top - r.height / 2) / 20;
      const imgs = c.querySelectorAll("img");
      for (let i of imgs) i.style.transform = `translate3d(${x}px,${y}px,0) scale(1.1)`;
    };
    c.onmouseleave = () => {
        const imgs = c.querySelectorAll("img");
        for (let i of imgs) i.style.transform = "";
    };
  });

  // LUZ FOOTER
  if (dom.footer) {
    dom.footer.onmousemove = e => {
      const r = dom.footer.getBoundingClientRect();
      dom.luzFooter.style.transform = `translate3d(${(e.clientX - r.left - r.width/2)*.5}px, ${(e.clientY - r.top - r.height/2)*.5}px, 0)`;
    };
  }

  // HOVERS GENERALES
  document.querySelectorAll(".objetivo-hover").forEach(el => {
    el.onmouseenter = () => dom.cuerpo.classList.add("hovering");
    el.onmouseleave = () => dom.cuerpo.classList.remove("hovering");
  });
  if (dom.fotoPerfil) dom.fotoPerfil.onmouseenter = () => dom.fotoPerfil.classList.add("enfocado");
}

/* ------------ RENDERIZADO ------------ */
function renderizarCursor() {
  const { mouseX, mouseY } = estado;
  
  dom.cursorInt.style.transform = `translate3d(${mouseX}px,${mouseY}px,0)`;
  dom.cursorExt.style.transform = `translate3d(${mouseX}px,${mouseY}px,0)`;

  // FONDO
  const px = (window.innerWidth - mouseX) / 50;
  const py = (window.innerHeight - mouseY) / 50;
  dom.parallax.forEach(p => p.style.transform = `translate3d(${px}px,${py}px,0) scale(1.05)`);

  // TITULO DINAMICO
  if (dom.tituloHero) {
    const r = dom.tituloHero.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    
    const dist = (mouseX - cx) ** 2 + (mouseY - cy) ** 2; 
    
    if (dist < 160000) {
      if (!dom.tituloHero.classList.contains("expandido")) {
        dom.tituloHero.innerHTML = dom.tituloHero.dataset.cerca;
        dom.tituloHero.classList.add("expandido");
      }
    } else {
      if (dom.tituloHero.classList.contains("expandido")) {
        dom.tituloHero.innerHTML = dom.tituloHero.dataset.lejos;
        dom.tituloHero.classList.remove("expandido");
      }
    }
  }

  // MAGNETISMO BOTONES IDIOMA
  let cerca = false;
  dom.globos.forEach(g => {
    const r = g.getBoundingClientRect();
    const dx = mouseX - (r.left + r.width / 2);
    const dy = mouseY - (r.top + r.height / 2);
    
    if ((dx*dx + dy*dy) < 2250000) {
      cerca = true;
      g.querySelector(".globo-3d").style.transform = `translate3d(${dx * 0.05}px,${dy * 0.05}px,0) rotateY(${dx * 0.1}deg) rotateX(${-dy * 0.1}deg)`;
    } else {
      g.querySelector(".globo-3d").style.transform = "none";
    }
  });
  dom.cuerpo.classList.toggle("magnetico", cerca);
  estado.moviendo = false;
}

function renderizarScroll() {
  const y = estado.scrollY * 0.1;
  dom.scrollImg.forEach(i => {
    
    if (!i.closest(".tarjeta-proyecto:hover")) {
        i.style.transform = `translate3d(0,${y}px,0)`;
    }
  });
  estado.scrolleando = false;
}

/* ------------ OBSERVER SECCIONES ------------ */
const obs = new IntersectionObserver(ent => ent.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add("activo");
    e.target.querySelectorAll(".aparecer").forEach(f => f.classList.add("visible"));
  }
}), { threshold: 0.15 });
document.querySelectorAll(".contenedor-seccion").forEach(s => obs.observe(s));