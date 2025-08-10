// webapp/components/MapView.jsx
"use client";

import { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { ProjectWizardV2 } from '@/components/ProjectWizardV2';
import { LocationInfoPanel } from '@/components/LocationInfoPanel';
import { OpportunityModal } from '@/components/OpportunityModal';
import { MarkersLayer } from '@/components/MarkersLayer'; // On se concentre sur les marqueurs

// Logique de filtrage qui détermine si une localisation doit être affichée
const filterLocation = (location, criteria) => {
    const { profil, styleDeVie, budget } = criteria;
    
    // 1. Filtre par profil (si un score existe)
    if (!location.scores || location.scores[profil] < 60) { // Seuil de compatibilité
        return false;
    }

    // 2. Filtre par style de vie (doit avoir au moins un des styles sélectionnés)
    if (styleDeVie.length > 0 && !styleDeVie.some(style => location.services.includes(style))) {
        return false;
    }

    // 3. Filtre par budget (le budget doit être supérieur au prix d'une propriété type de 80m²)
    const estimatedPrice = location.prixMoyenM2 * 80;
    if (budget < estimatedPrice) {
        return false;
    }

    return true; // Si tous les filtres passent
};


export default function MapView({ locations }) {
    const [criteria, setCriteria] = useState({
        profil: 'famille',
        styleDeVie: [],
        budget: 700000,
    });
    
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [modalLocation, setModalLocation] = useState(null);

    // La liste des localisations est maintenant filtrée, pas juste "scorée"
    const filteredLocations = useMemo(() => {
        return locations.filter(loc => filterLocation(loc, criteria));
    }, [locations, criteria]);
    
    const opportunityForModal = useMemo(() => 
        modalLocation ? modalLocation.biensDisponibles?.[0] : null,
        [modalLocation]
    );

    const handleFindOpportunities = (location) => {
        setModalLocation(location);
        setSelectedLocation(null);
    };

    return (
        <div className="w-full h-full relative">
            <MapContainer center={[42.02, 3.06]} zoom={10} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0, background: '#f0f0f0' }}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
                
                {/* La couche de marqueurs affiche maintenant UNIQUEMENT les points filtrés */}
                <MarkersLayer 
                    locations={filteredLocations} 
                    onZoneClick={setSelectedLocation} 
                />
            </MapContainer>
            
            {/* Panneau de contrôle flottant qui pilote les filtres */}
            <div className="absolute top-4 left-4 z-[1000] w-full max-w-sm bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/30">
                <ProjectWizardV2 
                    criteria={criteria} 
                    onCriteriaChange={setCriteria} 
                />
            </div>

            {/* Panneau d'information qui s'ouvre au clic */}
            <LocationInfoPanel 
                location={selectedLocation} 
                onClose={() => setSelectedLocation(null)} 
                onFindOpportunities={handleFindOpportunities}
                // On passe le score de compatibilité pour l'affichage
                displayScore={selectedLocation ? selectedLocation.scores[criteria.profil] : null}
            />
            
            {/* Modale pour les opportunités */}
            {modalLocation && (
                <OpportunityModal
                    location={modalLocation}
                    bien={opportunityForModal} // Peut être null, la modale le gère
                    onClose={() => setModalLocation(null)}
                />
            )}
        </div>
    );
}