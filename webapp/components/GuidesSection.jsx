// webapp/components/GuidesSection.jsx
"use client";
import { GuideCard } from './GuideCard';
import styles from './GuidesSection.module.css';
import { guides } from '@/data/guides';
import Link from 'next/link';

export function GuidesSection() {
  const popularGuides = guides.slice(0, 3);

  return (
    <section className={styles.section}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={styles.title}>Nos dernières analyses</h2>
          <p className={styles.subtitle}>
            Des conseils d'experts pour éclairer chaque étape de votre projet immobilier.
          </p>
        </div>
        
        <div className={styles.guidesGrid}>
          {popularGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>

        <div className={styles.ctaContainer}>
            <Link href="/guides" className={styles.ctaButton}>
                Voir toutes les analyses →
            </Link>
        </div>
      </div>
    </section>
  );
}