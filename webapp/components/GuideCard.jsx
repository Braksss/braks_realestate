// webapp/components/GuideCard.jsx
"use client";

import Link from 'next/link';
import styles from './GuideCard.module.css';

export function GuideCard({ guide }) {
  const shareIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>;

  const handleShare = (e) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: guide.title,
        text: guide.excerpt,
        url: window.location.origin + `/guides/${guide.slug}`,
      }).catch(console.error);
    } else {
      alert("La fonction de partage n'est pas supportée sur ce navigateur.");
    }
  };

  return (
    <div className={styles.card}>
      <Link href={`/guides/${guide.slug}`} className={styles.imageLink}>
        <img src={guide.image} alt={guide.title} />
      </Link>
      <div className={styles.content}>
        <div className={styles.header}>
            <span className={styles.category}>{guide.category}</span>
            <button onClick={handleShare} className={styles.shareButton} title="Partager ce guide">
                {shareIcon}
            </button>
        </div>
        <h3 className={styles.title}>
          <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
        </h3>
        <p className={styles.excerpt}>{guide.excerpt}</p>
        <div className={styles.authorInfo}>
          <img src={guide.authorImage} alt={guide.author} />
          <span>{guide.author}</span>
        </div>
      </div>
    </div>
  );
}