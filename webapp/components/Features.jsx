import styles from './Features.module.css';

// Nous définissons les icônes directement ici pour plus de simplicité.
// Ce sont des icônes minimalistes et modernes.
const icons = {
  explore: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2L12 22"></path><path d="M22 12L2 12"></path></svg>,
  discover: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><circle cx="12" cy="12" r="7"></circle><line x1="12" y1="2" x2="12" y2="5"></line><line x1="12" y1="19" x2="12" y2="22"></line><line x1="2" y1="12" x2="5" y2="12"></line><line x1="19" y1="12" x2="22" y2="12"></line></svg>,
  connect: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
};

export function Features() {
  return (
    <section className={styles.section}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={styles.heading}>Votre projet immobilier, simplifié</h2>
          <p className={styles.subheading}>
            Un parcours en trois étapes claires pour trouver le lieu qui vous ressemble vraiment.
          </p>
        </div>

        <div className={styles.stepsContainer}>
          {/* Étape 1 */}
          <div className={styles.step}>
            <div className={styles.iconWrapper}>
              <span className={styles.stepNumber}>1</span>
              {icons.explore}
            </div>
            <h3 className={styles.stepTitle}>Explorez les données</h3>
            <p className={styles.stepDescription}>Naviguez sur notre carte interactive et visualisez les prix, les tendances et les atouts de chaque ville.</p>
          </div>

          {/* Étape 2 */}
          <div className={styles.step}>
            <div className={styles.iconWrapper}>
              <span className={styles.stepNumber}>2</span>
              {icons.discover}
            </div>
            <h3 className={styles.stepTitle}>Découvrez votre zone idéale</h3>
            <p className={styles.stepDescription}>Utilisez les filtres pour affiner votre recherche et identifiez les localités qui matchent avec votre projet de vie.</p>
          </div>

          {/* Étape 3 */}
          <div className={styles.step}>
            <div className={styles.iconWrapper}>
              <span className={styles.stepNumber}>3</span>
              {icons.connect}
            </div>
            <h3 className={styles.stepTitle}>Contactez un expert</h3>
            <p className={styles.stepDescription}>Une fois votre sélection faite, bénéficiez d'un accompagnement gratuit pour concrétiser votre achat.</p>
          </div>
        </div>
      </div>
    </section>
  );
}