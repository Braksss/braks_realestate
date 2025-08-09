
"use client";
import { useState, useEffect } from 'react';
import styles from './LocationInfoPanel.module.css';

// Icônes pour les onglets
const OverviewIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const ExpertIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>;
const ServicesIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4a2 2 0 0 0-4 0v4"></path><path d="M12 12h.01"></path></svg>;

export function LocationInfoPanel({ location, onClose, displayScore }) {
  const [activeTab, setActiveTab] = useState('overview');

  // Réinitialise l'onglet sur "Aperçu" chaque fois qu'une nouvelle ville est sélectionnée
  useEffect(() => {
    setActiveTab('overview');
  }, [location]);

  const panelClasses = `${styles.panel} ${location ? styles.panelVisible : ''}`;

  // Si aucune localisation n'est sélectionnée, le panneau est simplement caché et ne rend rien
  if (!location) {
    return <div className={panelClasses}></div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'expert':
        return (
          <div>
            <h4 className={styles.contentTitle}>Scores par projet de vie</h4>
            <div className="space-y-4">
              {location.scores && Object.entries(location.scores).map(([profile, score]) => (
                <div key={profile}>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-gray-600 capitalize">{profile}</p>
                    <p className="text-sm font-bold text-orange-600">{score} / 10</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${score * 10}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            {location.conseilDeLexpert && (
              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                <h4 className="font-bold text-blue-800">Le conseil de l'expert</h4>
                <p className="text-sm text-blue-700 mt-1">{location.conseilDeLexpert}</p>
              </div>
            )}
          </div>
        );
      case 'services':
        return (
          <div>
            <h4 className={styles.contentTitle}>Services et Infrastructures</h4>
            <ul className={styles.list}>
              {location.services.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
        );
      case 'overview':
      default:
        return (
          <div>
            <p className={styles.description}>{location.description}</p>
            <div className={styles.dataGrid}>
              <div className={`${styles.dataWidget} ${styles.dataWidgetOrange}`}>
                <p className={`${styles.dataLabel} ${styles.dataLabelOrange}`}>Prix / m²</p>
                <p className={`${styles.dataValue} ${styles.dataValueOrange}`}>{location.prixMoyenM2.toLocaleString('fr-FR')} €</p>
              </div>
              <div className={`${styles.dataWidget} ${styles.dataWidgetBlue}`}>
                <p className={`${styles.dataLabel} ${styles.dataLabelBlue}`}>Évo. 5 ans</p>
                <p className={`${styles.dataValue} ${styles.dataValueBlue}`}>+{location.evolution5ans}%</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={panelClasses}>
      <div className={styles.header}>
        <img src={location.image} alt={`Vue de ${location.name}`} className={styles.image} />
        <button onClick={onClose} className={styles.closeButton}>&times;</button>
      </div>
      <div className={styles.content}>
        <div className="flex justify-between items-start mb-1">
            <h2 className={styles.title}>{location.name}</h2>
            {displayScore !== null && (
                <div className="text-center ml-4">
                    <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">Compatibilité</p>
                    <p className="text-3xl font-bold text-orange-500">{displayScore}%</p>
                </div>
            )}
        </div>
        <p className={styles.subtitle}>Costa Brava, Espagne</p>
        
        <div className={styles.tabContainer}>
          <button onClick={() => setActiveTab('overview')} className={`${styles.tabButton} ${activeTab === 'overview' ? styles.tabActive : ''}`}>
            <OverviewIcon /> Aperçu
          </button>
          <button onClick={() => setActiveTab('expert')} className={`${styles.tabButton} ${activeTab === 'expert' ? styles.tabActive : ''}`}>
            <ExpertIcon /> Analyse
          </button>
          <button onClick={() => setActiveTab('services')} className={`${styles.tabButton} ${activeTab === 'services' ? styles.tabActive : ''}`}>
            <ServicesIcon /> Services
          </button>
        </div>

        <div className={styles.tabContent}>
          {renderTabContent()}
        </div>
      </div>
      <div className={styles.footer}>
        <a href={`/lieux/${location.slug}`} className={styles.ctaButton}>
          Dossier complet sur {location.name}
        </a>
      </div>
    </div>
  );
}