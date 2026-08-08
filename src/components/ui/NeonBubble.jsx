import React, { useState, useEffect } from 'react';
import './NeonBubble.css';

const NeonBubble = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already closed it
    const hasClosed = localStorage.getItem('neonBubbleClosed');
    
    if (!hasClosed) {
      // Show the bubble after a short delay
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      // Hide the bubble 7 seconds after it appears
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 9000); // 2s (show) + 7s (visible)

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  const handleClose = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    localStorage.setItem('neonBubbleClosed', 'true');
  };

  const handleOpenChat = () => {
    if (window.botpress && typeof window.botpress.open === 'function') {
      window.botpress.open();
    } else if (window.botpressWebChat) {
      window.botpressWebChat.sendEvent({ type: 'show' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="neon-bubble-container" onClick={handleOpenChat}>
      <div className="neon-bubble-content">
        <span className="neon-bubble-text">💡¡Hola! ¿Buscás talento Proactivo? Lo que no ves en el portafolio, te lo cuento aquí. 🌟</span>
        <button className="neon-bubble-close" onClick={handleClose} aria-label="Cerrar">
          &times;
        </button>
        <div className="neon-bubble-arrow"></div>
      </div>
    </div>
  );
};

export default NeonBubble;
