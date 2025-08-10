// webapp/components/LocationInfoPanel.jsx
"use client";

import styles from './LocationInfoPanel.module.css';

const DataWidget = ({ label, value, unit = '', color = 'orange' }) => {
    if (value === null || typeof value === 'undefined') return null;
    const colorClasses = {
        orange: { bg: 'bg-orange-50', text: 'text-orange-600', label: 'text-orange-800' },
        blue: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'text-blue-800' }
    };
    const classes = colorClasses[color] || colorClasses.orange;

    return (
        <div className={`${styles.dataWidget} ${classes.bg}`}>
            <p className={`${styles.dataLabel} ${classes.label}`}>{label}</p>
            <p className={`${styles.dataValue} ${classes.text}`}>{value.toLocaleString('fr-FR')}{unit}</p>
        </div>
    );
};


export function LocationInfoPanel({ location, onClose }) {
  const panelClasses = `${styles.panel} ${location ? styles.panelVisible : ''}`;

  if (!location) return null;
  
  return (
    <aside className={panelClasses}>
      <div className={styles.header}>
        <img src={location.image} alt={`Vue de ${location.name}`} className={styles.image} />
        <button onClick={onClose} className={styles.closeButton}>&times;</button>
      </div>
      
      <div className={styles.content}>
        <h2 className={styles.title}>{location.name}</h2>
        <p className={styles.description}>{location.description}</p>
        
        <div className={styles.dataGrid}>
            <DataWidget label="Prix moyen / m²" value={location.prixMoyenM2} unit=" €" color="orange" />
            <DataWidget label="Évolution (5 ans)" value={location.evolution5ans} unit=" %" color="blue" />
        </div>
        
        <div className="my-6">
            <h3 className={styles.contentTitle}>Atouts & Points de vigilance</h3>
            <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                <div>
                    <h4 className="font-semibold text-green-700 mb-1">Points Forts</h4>
                    <ul className={styles.list}>
                        {location.styleDeVie?.atouts?.map(atout => <li key={atout}>{atout}</li>)}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-red-700 mb-1">Points de Vigilance</h4>
                     <ul className={styles.list}>
                        {location.styleDeVie?.inconvenients?.map(point => <li key={point}>{point}</li>)}
                    </ul>
                </div>
            </div>
        </div>

        {location.conseilDeLexpert && (
            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                <h4 className="font-bold text-blue-900">Le Conseil de l'Expert</h4>
                <p className="text-sm text-blue-800 mt-1">{location.conseilDeLexpert}</p>
            </div>
        )}
      </div>
      
      <div className={styles.footer}>
        <a href="#contact" className={styles.ctaButton}>
          Recevoir les biens Off-Market pour {location.name}
        </a>
      </div>
    </aside>
  );
}