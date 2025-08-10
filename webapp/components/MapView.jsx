// webapp/components/MapView.jsx
"use client";

import { useState, useMemo } from 'react';
// --- LA CORRECTION EST SUR LA LIGNE SUIVANTE ---
import { MapContainer, TileLayer } from 'react-leaflet'; 
import { FilterPanel } from '@/components/FilterPanel';
import { LocationInfoPanel } from '@/components/LocationInfoPanel';
import { DataHeatmapLayer } from '@/components/DataHeatmapLayer';
import { MarkersLayer } from '@/components/MarkersLayer';
import { LayerControls } from '@/components/LayerControls';
import { MapLegend } from '@/components/MapLegend';

// Logique de filtrage des localisations
const filterLocations = (locations, filters) => {
    return locations.filter(loc => {
        const { searchTerm, propertyType, maxPrice, services } = filters;
        if (searchTerm && !loc.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        if (propertyType !== 'tous' && !loc.typeDeBienMajoritaire.includes(propertyType)) return false;
        if (loc.prixMoyenM2 > maxPrice) return false;
        if (services.length > 0 && !services.every(s => loc.services.includes(s))) return false;
        return true;
    });
};

export default function MapView({ locations }) {
    const [filters, setFilters] = useState({
        searchTerm: '',
        propertyType: 'tous',
        maxPrice: 7000,
        services: [],
    });
    
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [activeLayer, setActiveLayer] = useState('opportunityIndex');

    const filteredLocations = useMemo(() => filterLocations(locations, filters), [locations, filters]);
    
    const dataRange = useMemo(() => {
        const values = locations.map(l => l[activeLayer]).filter(v => v != null);
        if (values.length === 0) return { min: 0, max: 0 };
        return { min: Math.min(...values), max: Math.max(...values) };
    }, [locations, activeLayer]);
    
    return (
        <div className="flex h-full">
            {/* Colonne de gauche : Filtres */}
            <aside className="w-1/4 h-full overflow-y-auto bg-white border-r shadow-lg z-20">
                <FilterPanel filters={filters} onFilterChange={setFilters} locations={locations} />
            </aside>
            
            {/* Colonne centrale : Carte */}
            <main className="w-3/4 h-full relative">
                <MapContainer center={[42.02, 3.06]} zoom={10} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0, background: '#f0f0f0' }}>
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
                    
                    <DataHeatmapLayer locations={locations} dataKey={activeLayer} range={dataRange} onZoneClick={setSelectedLocation} />
                    <MarkersLayer locations={filteredLocations} onZoneClick={setSelectedLocation} />

                </MapContainer>
                
                <LayerControls activeLayer={activeLayer} onLayerChange={setActiveLayer} />
                <MapLegend range={dataRange} activeLayer={activeLayer} />

                <LocationInfoPanel location={selectedLocation} onClose={() => setSelectedLocation(null)} />
            </main>
        </div>
    );
}