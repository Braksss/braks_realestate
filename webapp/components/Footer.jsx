import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="flex justify-center items-center gap-4">
                <p>© 2025 BraksInvest - Conseil en investissement immobilier par Benjamin Brassart.</p>
                <span className={styles.separator}>|</span>
                <Link href="/admin" className={styles.adminLink}>
                    Accès Pro
                </Link>
            </div>
        </footer>
    )
}