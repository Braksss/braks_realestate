// webapp/components/DashboardMap.jsx
"use client";

import { MapContainer, TileLayer, Circle, FeatureGroup, useMapEvents } from 'react-leaflet';
import { useMemo } from 'react';
import { PepitesLayer } from '@/components/PepitesLayer';

function MapEvents({ onMapRightClick }) {
  useMapEvents({
    contextmenu: (e) => {
      onMapRightClick(e);
    },
  });
  return null;
}

export default function DashboardMap({ locations, pepites, selectedClient, onMapRightClick }) {
    
    // Calcule les zones d'intérêt pour le client sélectionné
    const clientInterestZone = useMemo(() => {
        if (!selectedClient?.budget || !selectedClient.profil) return null;

        const budget = selectedClient.budget;
        const profil = selectedClient.profil;

        // Filtre les villes qui matchent le profil et le budget
        const matchingLocations = locations.filter(loc => {
            if (!loc.scores || !loc.prixMoyenM2) return false;
            const price = loc.prixMoyenM2 * 100; // Propriété type de 100m²
            return loc.scores[profil] > 6 && price < budget * 1.2; // Match si score > 6 et prix dans une marge de +20%
        });

        return matchingLocations;
    }, [selectedClient, locations]);

    return (
        <MapContainer center={[42.02, 3.06]} zoom={10} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
            
            {/* Affiche les zones d'intérêt du client */}
            {clientInterestZone && (
                <FeatureGroup>
                    {clientInterestZone.map(loc => (
                        <Circle 
                            key={loc.id}
                            center={loc.coordinates}
                            radius={2000} // Rayon de 2km autour de la ville
                            pathOptions={{ color: 'rgba(249, 115, 22, 0.5)', fillColor: 'rgba(249, 115, 22, 0.1)', weight: 2 }}
                        />
                    ))}
                </FeatureGroup>
            )}
            
            <PepitesLayer pepites={pepites} selectedClient={selectedClient} />
            <MapEvents onMapRightClick={onMapRightClick} />
        </MapContainer>
    );
}