import Link from 'next/link';
import styles from './Navbar.module.css';

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-24 text-white">
        <Link href='/' className={styles.logo}>
          Market<span className={styles.logoAccent}>Pulse</span>
        </Link>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8 font-medium">
            <a href='#explore' className={styles.navLink}>Explorer</a>
            <a href='#about' className={styles.navLink}>À Propos</a>
          </div>
          <a href='#' className={styles.ctaButton}>Se connecter</a>
        </div>
      </div>
    </nav>
  );
}