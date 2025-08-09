// webapp/components/MapView.jsx
"use client";

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapContainer, TileLayer } from 'react-leaflet';
import { ProjectWizard } from '@/components/ProjectWizardV2';
import { DataHeatmapLayer } from '@/components/DataHeatmapLayer';
import { LocationInfoPanel } from '@/components/LocationInfoPanel';
import { MapLegend } from '@/components/MapLegend';
import { OpportunityModal } from '@/components/OpportunityModal';
import { biensDisponibles } from '@/data/biensDisponibles';
import { MarkersLayer } from '@/components/MarkersLayer';
import { LayerControls } from '@/components/LayerControls';

const calculateOpportunityIndex = (location, criteria, regionAverages) => {
    let score = 0, maxScore = 0;
    maxScore += criteria.weights.compatibility;
    if (criteria.profil && location.scores?.[criteria.profil]) {
        score += (location.scores[criteria.profil] / 10) * criteria.weights.compatibility;
    }
    maxScore += criteria.weights.value;
    if (location.prixMoyenM2 < regionAverages.avgPrice) {
        score += Math.min(100, (1 - (location.prixMoyenM2 / regionAverages.avgPrice)) * 200) / 100 * criteria.weights.value;
    }
    maxScore += criteria.weights.potential;
    if (location.evolution5ans > regionAverages.avgEvolution) {
        score += Math.min(100, (location.evolution5ans / regionAverages.avgEvolution) * 75) / 100 * criteria.weights.potential;
    }
    if (maxScore === 0) return 0;
    return Math.round((score / maxScore) * 100);
};

export default function MapView({ locations }) {
    const searchParams = useSearchParams();
    const locationSlugFromUrl = searchParams.get('location');

    const [criteria, setCriteria] = useState({
        profil: 'famille',
        weights: { compatibility: 50, value: 25, potential: 25 }
    });
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [modalLocation, setModalLocation] = useState(null);
    const [activeLayer, setActiveLayer] = useState('opportunityIndex');
    
    useEffect(() => {
        if (locationSlugFromUrl) {
            const locationToSelect = locations.find(loc => loc.slug === locationSlugFromUrl);
            if (locationToSelect) {
                setSelectedLocation(locationToSelect);
            }
        }
    }, [locationSlugFromUrl, locations]);

    const regionAverages = useMemo(() => {
        const total = locations.length;
        if (total === 0) return { avgPrice: 0, avgEvolution: 0 };
        const sumPrice = locations.reduce((acc, loc) => acc + loc.prixMoyenM2, 0);
        const sumEvolution = locations.reduce((acc, loc) => acc + loc.evolution5ans, 0);
        return { avgPrice: sumPrice / total, avgEvolution: sumEvolution / total };
    }, [locations]);

    const locationsWithScore = useMemo(() => {
        if (!Array.isArray(locations)) return [];
        return locations.map(loc => ({
            ...loc,
            opportunityIndex: calculateOpportunityIndex(loc, criteria, regionAverages)
        })).sort((a, b) => b.opportunityIndex - a.opportunityIndex);
    }, [criteria, locations, regionAverages]);

    const dataRange = useMemo(() => {
        const values = locationsWithScore.map(l => l[activeLayer]);
        if (values.length === 0) return { min: 0, max: 100 };
        const numericValues = values.filter(v => typeof v === 'number');
        return { min: Math.min(...numericValues), max: Math.max(...numericValues) };
    }, [locationsWithScore, activeLayer]);
    
    const handleCriteriaChange = (name, value) => {
        if (name.startsWith('weight_')) {
            const weightName = name.split('_')[1];
            setCriteria(prev => ({ ...prev, weights: { ...prev.weights, [weightName]: value } }));
        } else {
            setCriteria(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const opportunityForModal = useMemo(() => 
        modalLocation ? biensDisponibles.find(b => b.locationSlug === modalLocation.slug) : null,
        [modalLocation]
    );

    const handleFindOpportunities = (location) => {
        setModalLocation(location);
        setSelectedLocation(null);
    };

    return (
        <>
            <aside className="w-full md:w-1/3 lg:w-1/4 h-full overflow-y-auto bg-white border-r border-gray-200 shadow-lg z-20">
                <ProjectWizard criteria={criteria} onCriteriaChange={handleCriteriaChange} />
            </aside>
            <main className="relative flex-grow h-full">
                <MapContainer center={[42.02, 3.06]} zoom={9} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0, backgroundColor: '#f0f0f0' }}>
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png" attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>' />
                    <DataHeatmapLayer key={`geojson-${activeLayer}-${JSON.stringify(criteria)}`} locations={locationsWithScore} onZoneClick={setSelectedLocation} dataKey={activeLayer} range={dataRange} />
                    <MarkersLayer locations={locationsWithScore} onZoneClick={setSelectedLocation} />
                </MapContainer>
                <LayerControls activeLayer={activeLayer} onLayerChange={setActiveLayer} />
                <MapLegend range={dataRange} activeLayer={activeLayer} />
            </main>
            <LocationInfoPanel 
                location={selectedLocation} 
                onClose={() => setSelectedLocation(null)} 
                displayScore={selectedLocation ? calculateOpportunityIndex(selectedLocation, criteria, regionAverages) : null} 
                regionAverages={regionAverages}
                onFindOpportunities={handleFindOpportunities}
            />
            {modalLocation && (
                <OpportunityModal
                    location={modalLocation}
                    bien={opportunityForModal}
                    onClose={() => setModalLocation(null)}
                />
            )}
        </>
    );
}