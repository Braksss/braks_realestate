import { locations } from '@/data/locations';
import { LocationCard } from '@/components/LocationCard';
import styles from './ExploreSection.module.css';
import Link from 'next/link'; // N'oubliez pas d'importer Link

export function ExploreSection() {
  return (
    <section id="explore" className={styles.section}>
      <div className="max-w-7xl mx-auto">
        <h2 className={styles.title}>Quelques lieux incroyables sur la Costa Brava</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {locations.slice(0, 8).map(loc => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>

        {/* --- NOUVEAU BLOC DE CODE CI-DESSOUS --- */}
        <div className="text-center mt-16">
          <Link href="/lieux" className="bg-orange-500 text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-orange-600 transition-colors">
            Explorer toutes les villes →
          </Link>
        </div>
        
      </div>
    </section>
  );
}