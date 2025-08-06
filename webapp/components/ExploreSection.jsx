import { locations } from '@/data/location';
import { LocationCard } from '@/components/LocationCard';
import styles from './ExploreSection.module.css';

export function ExploreSection() {
  return (
    <section id="explore" className={styles.section}>
      <div className="max-w-7xl mx-auto">
        <h2 className={styles.title}>Lieux incroyables sur la Costa Brava</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {locations.map(loc => <LocationCard key={loc.name} location={loc} />)}
        </div>
      </div>
    </section>
  );
}
