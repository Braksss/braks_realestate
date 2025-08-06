import styles from './SocialProof.module.css';

export function SocialProof() {
    return (
        <section className={styles.section}>
            <div className="max-w-7xl mx-auto px-6">
                <p className={styles.title}>Recommandé par les experts du secteur</p>
                <div className={styles.logos}>
                    <img src="https://placehold.co/120x30/cccccc/ffffff?text=LE+MONDE" alt="Logo Le Monde" />
                    <img src="https://placehold.co/120x30/cccccc/ffffff?text=FORBES" alt="Logo Forbes" />
                    <img src="https://placehold.co/120x30/cccccc/ffffff?text=EL+PAÍS" alt="Logo El País" />
                    <img src="https://placehold.co/120x30/cccccc/ffffff?text=TECHCRUNCH" alt="Logo TechCrunch" />
                </div>
            </div>
        </section>
    );
}