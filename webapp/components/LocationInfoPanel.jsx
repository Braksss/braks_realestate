// webapp/components/LocationInfoPanel.jsx
"use client";

import styles from './LocationInfoPanel.module.css';

// Sous-composant pour la barre de données, maintenant plus robuste
const DataBar = ({ label, value, average, unit = '' }) => {
    // Si la valeur est nulle ou non définie, on n'affiche rien.
    if (value === null || typeof value === 'undefined') {
        return null;
    }

    const isFavorable = label.includes('Prix') ? value < average : value > average;
    const widthPercentage = Math.min(100, (value / (average * 2)) * 100);

    return (
        <div>
            <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-gray-600">{label}</span>
                {/* On vérifie que 'value' est un nombre avant d'appeler toLocaleString */}
                <span className="font-bold text-gray-800">{typeof value === 'number' ? value.toLocaleString('fr-FR') : value}{unit}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 relative group">
                <div 
                    className={`h-2 rounded-full ${isFavorable ? 'bg-green-500' : 'bg-red-500'}`} 
                    style={{ width: `${widthPercentage}%` }}
                ></div>
                <div 
                    className="absolute h-full top-0 border-r-2 border-dashed border-gray-400" 
                    style={{ left: '50%' }} 
                    title={`Moyenne régionale: ${typeof average === 'number' ? average.toLocaleString('fr-FR') : average}${unit}`}
                ></div>
            </div>
        </div>
    );
};

export function LocationInfoPanel({ location, onClose, displayScore, regionAverages, onFindOpportunities }) {
  const panelClasses = `${styles.panel} ${location ? styles.panelVisible : ''}`;

  if (!location) {
    return null; // On ne rend rien si aucune location n'est sélectionnée
  }
  
  return (
    <aside className={panelClasses}>
      <div className={styles.header}>
        <img src={location.image} alt={`Vue de ${location.name}`} className={styles.image} />
        <button onClick={onClose} className={styles.closeButton}>&times;</button>
      </div>
      
      <div className={styles.content}>
        <div className="flex justify-between items-start mb-1">
            <h2 className={styles.title}>{location.name}</h2>
            {displayScore !== null && (
                <div className="text-center ml-4 flex-shrink-0">
                    <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">Opportunité</p>
                    <p className="text-4xl font-bold text-orange-500">{displayScore}</p>
                </div>
            )}
        </div>
        <p className={styles.subtitle}>{location.description}</p>
        
        <div className="my-6">
            <h3 className="font-bold text-gray-800 mb-3">Analyse du Marché</h3>
            <div className="space-y-4">
                <DataBar label="Prix / m²" value={location.prixMoyenM2} average={regionAverages.avgPrice} unit=" €" />
                <DataBar label="Croissance (5 ans)" value={location.evolution5ans} average={regionAverages.avgEvolution} unit="%" />
            </div>
        </div>
        
        <div className="my-6">
            <h3 className="font-bold text-gray-800 mb-3">Synthèse de l'Expert</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <h4 className="font-semibold text-green-700 mb-1">Points Forts</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {location.styleDeVie?.atouts?.slice(0, 3).map(atout => <li key={atout}>{atout}</li>)}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-red-700 mb-1">Points de Vigilance</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                         <li>Marché très prisé</li>
                         <li>Activité saisonnière</li>
                    </ul>
                </div>
            </div>
             {location.conseilDeLexpert && (
              <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                <p className="text-sm text-blue-800"><span className="font-bold">Note :</span> {location.conseilDeLexpert}</p>
              </div>
            )}
        </div>
      </div>
      
      <div className={styles.footer}>
        <button onClick={() => onFindOpportunities(location)} className={styles.ctaButton}>
          Trouver une opportunité à {location.name}
        </button>
      </div>
    </aside>
  );
}