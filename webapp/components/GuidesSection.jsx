
"use client";
import { GuideCard } from './GuideCard';
import styles from './GuidesSection.module.css';

// Données fictives pour les guides. Plus tard, elles viendront d'un CMS ou d'une base de données.
const popularGuides = [
  {
    category: 'Achat & Vente',
    title: 'Le guide ultime pour acheter une propriété sur la Costa Brava',
    excerpt: 'Toutes les étapes clés, des visites à la signature, pour un achat sans stress.',
    author: 'Benjamin Brassart',
    authorImage: 'https://placehold.co/100x100/orange/white?text=BB',
    image: 'https://placehold.co/600x400/2c3e50/ffffff?text=Guide+Achat',
    url: '/guides/guide-ultime-achat'
  },
  {
    category: 'Conseils Locaux',
    title: 'Les 5 villages les plus sous-estimés pour investir en 2025',
    excerpt: 'Découvrez des pépites cachées avant tout le monde et maximisez votre investissement.',
    author: 'Benjamin Brassart',
    authorImage: 'https://placehold.co/100x100/orange/white?text=BB',
    image: 'https://placehold.co/600x400/34495e/ffffff?text=Villages',
    url: '/guides/villages-sous-estimes'
  },
  {
    category: 'Style de Vie',
    title: 'Vivre sur la Costa Brava : Le quotidien au-delà des plages',
    excerpt: 'Culture, gastronomie, communauté... Plongez dans le véritable art de vivre local.',
    author: 'Benjamin Brassart',
    authorImage: 'https://placehold.co/100x100/orange/white?text=BB',
    image: 'https://placehold.co/600x400/e74c3c/ffffff?text=Style+de+Vie',
    url: '/guides/vivre-sur-la-costa-brava'
  }
];

export function GuidesSection() {
  return (
    <section className={styles.section}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={styles.title}>Nos guides les plus consultés</h2>
          <p className={styles.subtitle}>
            Des conseils d'experts pour éclairer chaque étape de votre projet immobilier.
          </p>
        </div>
        
        {/* Assurez-vous que la classe utilisée ici est bien styles.guidesGrid */}
        <div className={styles.guidesGrid}>
          {popularGuides.map((guide) => (
            <GuideCard key={guide.title} guide={guide} />
          ))}
        </div>

        <div className={styles.ctaContainer}>
            <a href="/guides" className={styles.ctaButton}>
                Voir tous les guides →
            </a>
        </div>
      </div>
    </section>
  );
}