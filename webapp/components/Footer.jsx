// webapp/components/Footer.jsx
import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="flex justify-center items-center gap-4">
                <p>© 2025 Costa Brava Market Pulse - Un service de conseil par Benjamin Brassart.</p>
                <span className={styles.separator}>|</span>
                <Link href="/admin" className={styles.adminLink}>
                    Administration
                </Link>
            </div>
        </footer>
    )
}