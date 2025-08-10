// webapp/components/ResultsSidebar.jsx
import styles from './ResultsSidebar.module.css';

export function ResultsSidebar({ locations, setHoveredLocationId, setSelectedLocation, selectedLocationId }) {
    if (locations.length === 0) {
        return (
            <div className={styles.emptyState}>
                <p>Aucune localité dans cette zone.</p>
                <p className="text-sm text-gray-500">Essayez de dézoomer ou de déplacer la carte.</p>
            </div>
        );
    }
    
    return (
        <div className={styles.container}>
            {locations.map(loc => {
                const isSelected = loc.id === selectedLocationId;
                return (
                    <div 
                        key={loc.id} 
                        className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
                        onMouseEnter={() => setHoveredLocationId(loc.id)}
                        onMouseLeave={() => setHoveredLocationId(null)}
                        onClick={() => setSelectedLocation(loc)} // Rend la carte cliquable
                    >
                        <img src={loc.image} alt={loc.name} className={styles.cardImage} />
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>{loc.name}</h3>
                            <p className={styles.cardDescription}>{loc.description}</p>
                            <div className={styles.cardInfo}>
                               {loc.prixMoyenM2 && <span>{loc.prixMoyenM2.toLocaleString('fr-FR')} €/m²</span>}
                               {loc.evolution5ans && <span className={loc.evolution5ans > 0 ? 'text-green-600' : 'text-red-600'}>
                                    {loc.evolution5ans > 0 ? '▲' : '▼'} {loc.evolution5ans}%
                                </span>}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}