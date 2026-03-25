// IMPORTACIONES
import React, { Suspense, lazy } from 'react';
import TargetCursor from '../components/ui/TargetCursor';
import Header from '../components/layout/Header';
import Hero from '../components/ui/Hero';
import Profile from '../components/ui/Profile';
import Projects from '../components/ui/Projects';
import Skills from '../components/ui/Skills';
import Footer from '../components/layout/Footer';

const LiquidEther = lazy(() => import('../components/ui/LiquidEther'));

// COMPONENTE PRINCIPAL DE LA PAGINA
export default function Home() {
  // RENDERIZADO
  return (
    <div className="app-container">
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      />
      
      <div className="background-liquid">
        <Suspense fallback={null}>
          <LiquidEther
            colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
            mouseForce={20}
            cursorSize={100}
            isViscous
            viscous={30}
            iterationsViscous={16}
            iterationsPoisson={16}
            resolution={0.35}
            isBounce={false}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </Suspense>
      </div>

      <Header />
      
      <main>
        <Hero />
        <Profile />
        <Projects />
        <Skills />
      </main>

      <Footer />
    </div>
  );
}
