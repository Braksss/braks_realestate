// webapp/components/Features.jsx
import styles from './Features.module.css';

const icons = {
  data: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="M18.7 8a6 6 0 0 0-8.4-8.4" /><path d="M12.3 13.7a6 6 0 0 0 8.4 8.4" /></svg>,
  target: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
  handshake: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8.5L12 11L8 8.5" /><path d="M9 14.5a2.5 2.5 0 1 1 -5 0a2.5 2.5 0 0 1 5 0Z" /><path d="M15 14.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1 -5 0Z" /><path d="M4 12v-2a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v2" /></svg>,
};

export function Features() {
  return (
    <section className={styles.section}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={styles.heading}>Un service, trois piliers</h2>
          <p className={styles.subheading}>
            Je transforme la recherche immobilière en une démarche stratégique et éclairée.
          </p>
        </div>

        <div className={styles.stepsContainer}>
          <div className={styles.step}>
            <div className={styles.iconWrapper}>{icons.data}</div>
            <h3 className={styles.stepTitle}>1. Analyse de Données</h3>
            <p className={styles.stepDescription}>Accédez à des cartes de chaleur exclusives sur les prix, les rendements locatifs et les tendances pour identifier les vraies zones de potentiel.</p>
          </div>

          <div className={styles.step}>
            <div className={styles.iconWrapper}>{icons.target}</div>
            <h3 className={styles.stepTitle}>2. Prospection Ciblée</h3>
            <p className={styles.stepDescription}>Grâce à la veille et aux données, je vous donne accès au marché "off-market" : les biens qui ne sont pas encore sur internet.</p>
          </div>

          <div className={styles.step}>
            <div className={styles.iconWrapper}>{icons.handshake}</div>
            <h3 className={styles.stepTitle}>3. Accompagnement Expert</h3>
            <p className={styles.stepDescription}>De la négociation à la signature, je sécurise chaque étape de votre acquisition en Espagne, en défendant vos intérêts.</p>
          </div>
        </div>
      </div>
    </section>
  );
}