// webapp/components/ResultsList.jsx

import { LocationIdentityCard } from './LocationIdentityCard';

export function ResultsList({ locations, setHoveredLocationId }) {
    return (
        <div className="p-4 pt-8">
            <h2 className="text-xl font-bold mb-1 text-gray-900">Résultats</h2>
            <p className="text-gray-500 mb-4 text-sm">{locations.length} localités suggérées</p>
            
            <div className="space-y-4">
                {locations.length > 0 ? (
                    locations.map(loc => (
                        <div 
                            key={loc.id}
                            onMouseEnter={() => setHoveredLocationId(loc.id)}
                            onMouseLeave={() => setHoveredLocationId(null)}
                        >
                            <LocationIdentityCard location={loc} />
                        </div>
                    ))
                ) : (
                    <div className="text-center p-8">
                        <p className="text-gray-600">Ajustez les critères pour commencer votre recherche.</p>
                    </div>
                )}
            </div>
        </div>
    );
}