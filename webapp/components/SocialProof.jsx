// webapp/components/SocialProof.jsx
import styles from './SocialProof.module.css';

export function SocialProof() {
    return (
        <section className={styles.section}>
            <div className="max-w-7xl mx-auto px-6">
                <p className={styles.title}>Une approche de l'investissement immobilier reconnue</p>
                <div className={styles.logos}>
                    <img src="https://placehold.co/120x30/cccccc/ffffff?text=FORBES" alt="Logo Forbes" />
                    <img src="https://placehold.co/120x30/cccccc/ffffff?text=EL+PAÍS" alt="Logo El País" />
                    <img src="https://placehold.co/120x30/cccccc/ffffff?text=TECHCRUNCH" alt="Logo TechCrunch" />
                    <img src="https://placehold.co/120x30/cccccc/ffffff?text=LE+FIGARO" alt="Logo Le Figaro" />
                </div>
            </div>
        </section>
    );
}