// webapp/hooks/useLockBodyScroll.js
"use client";
import { useLayoutEffect } from 'react';

// Ce hook simple bloque le scroll de la page quand un composant (ex: une modale) est affiché
export function useLockBodyScroll() {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = originalStyle);
  }, []);
}