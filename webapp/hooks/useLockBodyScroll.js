"use client";

import { useLayoutEffect } from 'react';

// Ce hook bloque et débloque le scroll du body
export function useLockBodyScroll() {
  useLayoutEffect(() => {
    // Sauvegarde le style 'overflow' original du body
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // Bloque le scroll quand le composant est monté
    document.body.style.overflow = 'hidden';
    
    // Réactive le scroll quand le composant est démonté (quand on quitte la page)
    return () => (document.body.style.overflow = originalStyle);
  }, []); // Le tableau vide assure que cet effet ne s'exécute qu'une seule fois
}