import Link from 'next/link';
import { icons } from '@/assets/icons'; // Assurez-vous que ce chemin est correct
import styles from './LocationCard.module.css';

export function LocationCard({ location }) {
  return (
    <Link href={`/lieux/${location.slug}`} className={`${styles.card} group block overflow-hidden rounded-2xl`}>
      <div className={styles.imageWrapper}>
        <img src={location.image} alt={location.name} />
        <div className={styles.overlay}></div>
        {/* L'icône peut être optionnelle si vous ne l'avez pas configurée */}
        {/* <div className={styles.icon}>{icons.mapPin}</div> */}
        <div className={styles.content}>
          <p>Costa Brava</p>
          <h3>{location.name}</h3>
        </div>
      </div>
    </Link>
  );
}