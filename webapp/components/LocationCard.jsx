// webapp/components/LocationCard.jsx
import Link from 'next/link';
import styles from './LocationCard.module.css';

export function LocationCard({ location }) {
  return (
    // --- MODIFICATION DU LIEN ICI ---
    // On redirige vers l'explorateur avec le slug de la ville en paramètre d'URL
    <Link href={`/explorateur?location=${location.slug}`} className={`${styles.card} group block overflow-hidden rounded-2xl cursor-pointer`}>
      <div className={styles.imageWrapper}>
        <img src={location.image} alt={location.name} className={styles.image} />
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <p>Costa Brava</p>
          <h3>{location.name}</h3>
        </div>
      </div>
    </Link>
  );
}