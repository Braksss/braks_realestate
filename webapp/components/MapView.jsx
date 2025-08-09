"use client";

import { useMemo, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { ProjectWizard } from '@/components/ProjectWizard';
import { DataHeatmapLayer } from '@/components/DataHeatmapLayer';
import { LocationInfoPanel } from '@/components/LocationInfoPanel';
import { MapLegend } from '@/components/MapLegend';

// --- LE NOUVEL ALGORITHME D'INDICE D'OPPORTUNITÉ ---
const calculateOpportunityIndex = (location, criteria, regionAverages) => {
    // 1. Score de Compatibilité (Votre Projet) - Poids: 40%
    let compatScore = 0;
    if (criteria.profil && location.scores?.[criteria.profil]) {
        compatScore = (location.scores[criteria.profil] / 10) * 100; // Normalise sur 100
    }

    // 2. Score de Valeur (Le Marché) - Poids: 30%
    let valueScore = 0;
    if (location.prixMoyenM2 < regionAverages.avgPrice) {
        // Plus le prix est bas par rapport à la moyenne, meilleur est le score
        valueScore = Math.min(100, (1 - (location.prixMoyenM2 / regionAverages.avgPrice)) * 200);
    }
    
    // 3. Score de Potentiel (Le Futur) - Poids: 30%
    let potentialScore = 0;
    if (location.evolution5ans > regionAverages.avgEvolution) {
        // Plus la croissance est forte par rapport à la moyenne, meilleur est le score
        potentialScore = Math.min(100, (location.evolution5ans / regionAverages.avgEvolution) * 75);
    }
    
    // On applique les poids définis par l'utilisateur
    const totalWeight = criteria.weights.compatibility + criteria.weights.value + criteria.weights.potential;
    if (totalWeight === 0) return 0;
    
    const finalScore = 
        (compatScore * criteria.weights.compatibility +
         valueScore * criteria.weights.value +
         potentialScore * criteria.weights.potential) / totalWeight;

    return Math.round(finalScore);
};


export default function MapView({ locations }) {
    const [criteria, setCriteria] = useState({
        profil: 'famille',
        // NOUVEAU: Les poids pour l'algorithme !
        weights: {
            compatibility: 50, // L'utilisateur veut d'abord ce qui lui correspond
            value: 25,         // Puis une bonne affaire
            potential: 25,     // Et enfin un bon potentiel
        }
    });
    const [selectedLocation, setSelectedLocation] = useState(null);

    // On calcule les moyennes de la région UNE SEULE FOIS
    const regionAverages = useMemo(() => {
        const total = locations.length;
        if (total === 0) return { avgPrice: 0, avgEvolution: 0 };
        const sumPrice = locations.reduce((acc, loc) => acc + loc.prixMoyenM2, 0);
        const sumEvolution = locations.reduce((acc, loc) => acc + loc.evolution5ans, 0);
        return {
            avgPrice: sumPrice / total,
            avgEvolution: sumEvolution / total,
        };
    }, [locations]);

    const locationsWithScore = useMemo(() => {
        return locations.map(loc => ({
            ...loc,
            opportunityIndex: calculateOpportunityIndex(loc, criteria, regionAverages)
        })).sort((a, b) => b.opportunityIndex - a.opportunityIndex);
    }, [criteria, locations, regionAverages]);

    const scoreRange = useMemo(() => {
        const scores = locationsWithScore.map(l => l.opportunityIndex);
        if (scores.length === 0) return { min: 0, max: 100 };
        return { min: Math.min(...scores), max: Math.max(...scores) };
    }, [locationsWithScore]);
    
    const handleCriteriaChange = (name, value) => {
        if (name.startsWith('weight_')) {
            const weightName = name.split('_')[1];
            setCriteria(prev => ({
                ...prev,
                weights: { ...prev.weights, [weightName]: value }
            }));
        } else {
            setCriteria(prev => ({ ...prev, [name]: value }));
        }
    };

    return (
        <>
            <aside className="w-full md:w-1/3 lg:w-1/4 h-full overflow-y-auto bg-white border-r border-gray-200 shadow-lg z-20">
                <ProjectWizard criteria={criteria} onCriteriaChange={handleCriteriaChange} />
            </aside>
            <main className="relative flex-grow h-full">
                <MapContainer center={[42.02, 3.06]} zoom={9} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0, backgroundColor: '#f0f0f0' }}>
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png" attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>' />
                    <DataHeatmapLayer key={JSON.stringify(criteria)} locations={locationsWithScore} onZoneClick={setSelectedLocation} dataKey="opportunityIndex" range={scoreRange} />
                </MapContainer>
                <MapLegend range={scoreRange} unit="%" title="Indice d'Opportunité" />
            </main>
            <LocationInfoPanel location={selectedLocation} onClose={() => setSelectedLocation(null)} displayScore={selectedLocation ? calculateOpportunityIndex(selectedLocation, criteria, regionAverages) : null} regionAverages={regionAverages} />
        </>
    );
}