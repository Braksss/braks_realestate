// webapp/components/Hero.jsx
import Link from 'next/link';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={`${styles.heroSection} relative min-h-screen flex items-center px-6 overflow-hidden`}>
      <div className={styles.heroBackground}>
        <img src='/Vue côtière depuis une villa moderne.png' alt='Villa sur la Costa Brava' />
        <div className={styles.heroOverlay}></div>
      </div>
      <div className="relative max-w-7xl mx-auto w-full flex justify-between items-center">
        <div className={styles.textBubble}>
          <h1>Trouvez les trésors cachés de la Costa Brava.</h1>
          <p>Notre outil analyse des milliers de données pour vous guider vers la ville et le bien qui vous correspondent vraiment, loin des sentiers battus.</p>
          
          <div className="mt-8">
            <Link href="/explorateur" className={styles.heroCtaButton}>
              Lancer l'explorateur de marché
            </Link>
          </div>
        </div>
      </div>
      <div className={`${styles.imageCard} hidden md:block`}>
          <div>
            <img src="https://placehold.co/500x350/ffffff?text=Propriété+d'Exception" alt="Propriété d'exception" />
            <h3>Villa à Begur</h3>
            <p>"Une vue imprenable sur les îles Medes..."</p>
          </div>
        </div>
    </section>
  );
}