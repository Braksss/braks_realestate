// webapp/components/Navbar.jsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ... (code des icônes inchangé) ...
  const menuIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
  const closeIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;


  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href='/' className={styles.logo} onClick={() => setIsMenuOpen(false)}>
          Market<span className={styles.logoAccent}>Pulse</span>
        </Link>
        
        <div className={styles.desktopNav}>
          <Link href='/explorateur' className={styles.navLink}>Explorateur</Link>
          <Link href='/opportunites' className={styles.navLink}>Biens Off-Market</Link>
          <Link href='/estimer' className={styles.navLink}>Estimer</Link>
          <Link href='/guides' className={styles.navLink}>Guides</Link>
        </div>
        
        <div className={styles.actions}>
          <a href='#' className={styles.ctaButton}>Se connecter</a>
          <button 
            className={styles.mobileMenuButton} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Ouvrir le menu"
          >
            {isMenuOpen ? closeIcon : menuIcon}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link href='/explorateur' className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Explorateur</Link>
          <Link href='/opportunites' className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Biens Off-Market</Link>
          <Link href='/estimer' className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Estimer</Link>
          <Link href='/guides' className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Guides</Link>
        </div>
      )}
    </header>
  );
}