// webapp/app/guides/[slug]/page.jsx
import { guides } from '@/data/guides';
import styles from './SingleGuidePage.module.css';
import Link from 'next/link';

function getGuideData(slug) {
  return guides.find(guide => guide.slug === slug);
}

// Génère les pages statiques au moment du build
export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

function GuideSidebar({ guide }) {
  const MapIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarStickyContent}>
        <h3 className={styles.sidebarTitle}>À propos de l'auteur</h3>
        <div className="flex items-center gap-4 mb-8">
          <img src={guide.authorImage} alt={guide.author} className="w-16 h-16 rounded-full" />
          <div>
            <p className="font-bold text-gray-900">{guide.author}</p>
            <p className="text-sm text-gray-500">Expert Immobilier, Costa Brava</p>
          </div>
        </div>
        
        <div className={styles.toolPromoBox}>
            <div className="flex items-center gap-3 text-orange-500">
                <MapIcon />
                <h4 className="font-bold text-lg">Votre Outil d'Expert</h4>
            </div>
            <p className="text-sm text-gray-600 mt-2 mb-4">
                Explorez les données du marché en temps réel sur notre carte interactive.
            </p>
            <Link href="/explorateur" className={styles.toolPromoButton}>
                Lancer l'Analyseur
            </Link>
        </div>
      </div>
    </aside>
  );
}

export default function GuidePage({ params }) {
  const guide = getGuideData(params.slug);

  if (!guide) {
    // Dans un vrai projet, on utiliserait notFound() de Next.js
    return <div>Guide non trouvé</div>;
  }

  return (
    <div className="bg-white">
      <div className={styles.container}>
        <article className={styles.article}>
          <header className="mb-12">
            <p className="text-orange-500 font-semibold mb-2">{guide.category}</p>
            <h1 className={styles.title}>{guide.title}</h1>
          </header>

          <img src={guide.image} alt={guide.title} className={styles.mainImage} />

          <div 
            className="prose lg:prose-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: guide.content }}
          />
        </article>

        <GuideSidebar guide={guide} />
      </div>
    </div>
  );
}