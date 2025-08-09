"use client"; // Ce composant est 100% client-side

import { useMemo, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

// On importe les autres composants ici, à l'intérieur de ce composant client
import { ProjectWizard } from '@/components/ProjectWizard';
import { DataHeatmapLayer } from '@/components/DataHeatmapLayer';
import { LocationInfoPanel } from '@/components/LocationInfoPanel';
import { MapLegend } from '@/components/MapLegend';

// --- L'ALGORITHME DE COMPATIBILITÉ ---
const calculateMatchScore = (location, criteria) => {
    let score = 0;
    let maxScore = 0;

    // 1. Score de base basé sur le profil (Pondération: 50%)
    maxScore += 50;
    if (criteria.profil && location.scores && location.scores[criteria.profil]) {
        score += location.scores[criteria.profil] * 5;
    }

    // 2. Score du budget (Pondération: 30%)
    maxScore += 30;
    if (location.prixMoyenM2 <= criteria.maxPrice) {
        score += 30;
    } else if (location.prixMoyenM2 <= criteria.maxPrice * 1.1) {
        score += 15;
    }

    // 3. Score de l'ambiance (Pondération: 20%)
    maxScore += 20;
    if (criteria.ambiance === 'toutes' || (location.styleDeVie && location.styleDeVie.ambiance === criteria.ambiance)) {
        score += 20;
    }

    if (maxScore === 0) return 0;
    return Math.round((score / maxScore) * 100);
};

export function MapView({ locations }) {
    const [criteria, setCriteria] = useState({
        profil: 'famille',
        maxPrice: 4500,
        ambiance: 'toutes',
    });

    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleCriteriaChange = (name, value) => {
        setCriteria(prev => ({ ...prev, [name]: value }));
    };

    const locationsWithMatchScore = useMemo(() => {
        return locations.map(loc => ({
            ...loc,
            matchScore: calculateMatchScore(loc, criteria)
        })).sort((a, b) => b.matchScore - a.matchScore);
    }, [criteria, locations]);

    const scoreRange = useMemo(() => {
        if (locationsWithMatchScore.length === 0) return { min: 0, max: 100 };
        const scores = locationsWithMatchScore.map(l => l.matchScore);
        return { min: Math.min(...scores), max: Math.max(...scores) };
    }, [locationsWithMatchScore]);

    return (
        <>
            {/* Colonne de l'assistant de projet */}
            <aside className="w-full md:w-1/3 lg:w-1/4 h-full overflow-y-auto bg-white border-r border-gray-200 shadow-lg z-20">
                <ProjectWizard 
                    criteria={criteria} 
                    onCriteriaChange={handleCriteriaChange}
                    locations={locations}
                />
            </aside>

            {/* Colonne de la Carte */}
            <main className="relative flex-grow h-full">
                <MapContainer center={[42.02, 3.06]} zoom={9} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0, backgroundColor: '#f0f0f0' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
                    />
                    <DataHeatmapLayer 
                        key={JSON.stringify(criteria)}
                        locations={locationsWithMatchScore} 
                        onZoneClick={setSelectedLocation}
                        dataKey="matchScore" 
                        range={scoreRange}
                    />
                </MapContainer>
                <MapLegend range={scoreRange} unit="%" title="Score de compatibilité" />
            </main>
          
            <LocationInfoPanel 
                location={selectedLocation} 
                onClose={() => setSelectedLocation(null)}
                displayScore={selectedLocation ? calculateMatchScore(selectedLocation, criteria) : null}
            />
        </>
    );
}

// On exporte par défaut pour l'import dynamique
export default MapView;