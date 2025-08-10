// webapp/components/Hero.jsx
import Link from 'next/link';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}>
        <img src='/Vue côtière depuis une villa moderne.png' alt='Villa sur la Costa Brava' />
        <div className={styles.heroOverlay}></div>
      </div>
      <div className="relative max-w-7xl mx-auto w-full">
        <div className={styles.textBubble}>
          <h1>Trouvez les trésors cachés de la Costa Brava.</h1>
          <p>Mon service combine expertise de terrain et analyse de données pour vous guider vers le bien qui correspond à votre stratégie, pas seulement à vos envies.</p>
          
          <div className="mt-8">
            <Link href="/explorateur" className={styles.heroCtaButton}>
              Lancer l'Analyseur de Marché
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}