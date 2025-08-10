"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
  const closeIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href='/' className={styles.logo} onClick={closeMenu}>
          Braks<span className={styles.logoAccent}>Invest</span>
        </Link>
        
        <div className={styles.desktopNav}>
          <Link href='/explorateur' className={styles.navLink}>Analyseur de Marché</Link>
          <Link href='/opportunites' className={styles.navLink}>Le Marché Confidentiel</Link>
          <Link href='/estimer' className={styles.navLink}>Estimer</Link>
          <Link href='/guides' className={styles.navLink}>Guides</Link>
        </div>
        
        <div className={styles.actions}>
           <Link href="/admin" className={styles.ctaButton}>
                Espace Pro
            </Link>
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
          <Link href='/explorateur' className={styles.mobileNavLink} onClick={closeMenu}>Analyseur de Marché</Link>
          <Link href='/opportunites' className={styles.mobileNavLink} onClick={closeMenu}>Le Marché Confidentiel</Link>
          <Link href='/estimer' className={styles.mobileNavLink} onClick={closeMenu}>Estimer</Link>
          <Link href='/guides' className={styles.mobileNavLink} onClick={closeMenu}>Guides</Link>
        </div>
      )}
    </header>
  );
}