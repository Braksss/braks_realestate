import { icons } from '@/assets/icons';
import styles from './LocationCard.module.css';

export function LocationCard({ location }) {
  return (
    <a href="#" className={`${styles.card} group block overflow-hidden rounded-2xl`}>
      <div className={styles.imageWrapper}>
        <img src={location.image} alt={location.name} />
        <div className={styles.overlay}></div>
        <div className={styles.icon}>{icons.mapPin}</div>
        <div className={styles.content}>
          <p>Costa Brava</p>
          <h3>{location.name}</h3>
        </div>
      </div>
    </a>
  );
}