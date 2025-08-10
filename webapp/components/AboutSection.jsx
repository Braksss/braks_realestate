// webapp/components/AboutSection.jsx
import Link from 'next/link';
import styles from './AboutSection.module.css';

export function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <img src="https://placehold.co/600x450/34495e/ffffff?text=Benjamin+Brassart" alt="Portrait de Benjamin Brassart" className={styles.image} />
        </div>
        <div className="md:max-w-lg">
          <h2 className={styles.title}>Qui suis-je ?</h2>
          <p className={styles.paragraph}>Agent immobilier passionné par la data, j'ai créé cet outil pour résoudre ma propre frustration : le manque de données fiables et l'opacité du marché. Mon objectif n'est pas de vous faire visiter des maisons, mais de vous aider à prendre la meilleure décision d'investissement.</p>
          <p className={styles.paragraph}>Avec BraksInvest, vous ne choisissez pas un bien, vous choisissez une stratégie.</p>
          <Link href="/guides" className={styles.link}>
            Consultez mes analyses →
          </Link>
        </div>
      </div>
    </section>
  );
}