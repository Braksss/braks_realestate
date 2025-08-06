import styles from './AboutSection.module.css';

export function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="md:max-w-lg">
          <h2 className={styles.title}>De quoi s'agit-il ?</h2>
          <p className={styles.paragraph}>Market Pulse est un service d'expert gratuit pour trouver les meilleures opportunités immobilières sur la Costa Brava. Nous vous aidons à explorer le marché via une carte immersive, des filtres intelligents et des analyses de données précises.</p>
          <a href="#" className={styles.link}>En savoir plus →</a>
        </div>
        <div>
          <img src="https://placehold.co/600x450/ffffff/dee2e6?text=Analyse+de+Données" alt="Analyse de données" className={styles.image} />
        </div>
      </div>
    </section>
  );
}