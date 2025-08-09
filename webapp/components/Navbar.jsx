"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Icônes pour le menu mobile
  const menuIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
  const closeIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href='/' className={styles.logo} onClick={() => setIsMenuOpen(false)}>
          Market<span className={styles.logoAccent}>Pulse</span>
        </Link>
        
        {/* Navigation pour ordinateur */}
        <div className={styles.desktopNav}>
          <Link href='/explorateur' className={styles.navLink}>Explorateur</Link>
          {/* --- AJOUT DU LIEN VERS L'ESTIMATEUR --- */}
          <Link href='/estimer' className={styles.navLink}>Estimer un bien</Link>
          <Link href='/guides' className={styles.navLink}>Guides</Link>
          <Link href='/#about' className={styles.navLink}>À Propos</Link>
        </div>
        
        <div className={styles.actions}>
          <a href='#' className={styles.ctaButton}>Se connecter</a>
          
          {/* Bouton pour le menu mobile */}
          <button 
            className={styles.mobileMenuButton} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Ouvrir le menu"
          >
            {isMenuOpen ? closeIcon : menuIcon}
          </button>
        </div>
      </nav>

      {/* Menu mobile (s'affiche en superposition) */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href='/explorateur' className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Explorateur</Link>
          {/* --- AJOUT DU LIEN VERS L'ESTIMATEUR --- */}
          <Link href='/estimer' className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Estimer un bien</Link>
          <Link href='/guides' className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Guides</Link>
          <Link href='/#about' className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>À Propos</Link>
        </div>
      )}
    </header>
  );
}