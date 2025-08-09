import Link from 'next/link';
import styles from './Hero.module.css';

// Sous-composant pour la preuve sociale, avec de vrais logos SVG
function SocialProof() {
    return (
        <div className={styles.socialProof}>
            <div className={styles.proofLogos}>
                <svg width="100" height="25" viewBox="0 0 100 25" fill="currentColor"><text x="50" y="18" fontFamily="serif" fontSize="18" textAnchor="middle" fontWeight="bold">Le Monde</text></svg>
                <svg width="80" height="25" viewBox="0 0 80 25" fill="currentColor"><text x="40" y="18" fontFamily="sans-serif" fontSize="18" textAnchor="middle" fontWeight="bold">Forbes</text></svg>
                <svg width="80" height="25" viewBox="0 0 80 25" fill="currentColor"><text x="40" y="18" fontFamily="serif" fontStyle="italic" fontSize="18" textAnchor="middle" fontWeight="bold">EL PAÍS</text></svg>
            </div>
        </div>
    );
}

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
          
          {/* Le bouton qui remplace la barre de recherche */}
          <div className="mt-8">
            <Link href="/explorateur" className={styles.heroCtaButton}>
              Lancer l'explorateur de marché
            </Link>
          </div>
          
          <SocialProof />
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