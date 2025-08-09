// webapp/app/guides/[slug]/page.jsx
import { guides } from '@/data/guides';
import styles from './SingleGuidePage.module.css';

function getGuideData(slug) {
  return guides.find(guide => guide.slug === slug);
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
        
        <div className={styles.ctaBox}>
          <h4 className="font-bold text-lg text-gray-900">Prêt à passer à l'action ?</h4>
          <p className="text-sm text-gray-600 mt-2 mb-4">
            Discutons de votre projet. Je vous offre un premier appel stratégique pour clarifier vos objectifs.
          </p>
          <a href="#" className={styles.ctaButton}>
            Planifier un appel gratuit
          </a>
        </div>

        {/* --- ENCART PROMOTIONNEL AJOUTÉ --- */}
        <div className={styles.toolPromoBox}>
            <div className="flex items-center gap-3 text-orange-500">
                <MapIcon />
                <h4 className="font-bold text-lg">Votre outil d'expert</h4>
            </div>
            <p className="text-sm text-gray-600 mt-2 mb-4">
                Explorez les données du marché en temps réel sur notre carte interactive.
            </p>
            <a href="/explorateur" className={styles.toolPromoButton}>
                Lancer l'explorateur
            </a>
        </div>
      </div>
    </aside>
  );
}

export default function GuidePage({ params }) {
  const guide = getGuideData(params.slug);

  if (!guide) {
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