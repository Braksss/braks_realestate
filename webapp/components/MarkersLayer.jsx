// webapp/components/MarkersLayer.jsx
"use client";

import { CircleMarker, Tooltip } from 'react-leaflet';

// Fonction pour la couleur du marqueur
function getScoreColor(score) {
    if (score > 85) return '#d9480f'; // Très forte opportunité
    if (score > 70) return '#f97316'; // Forte opportunité
    if (score > 50) return '#f9b572'; // Opportunité moyenne
    return '#a1a1aa'; // Faible
}

export function MarkersLayer({ locations, onZoneClick }) {
  // On affiche uniquement les villes qui n'ont PAS de polygone
  const locationsWithoutShape = locations.filter(l => !["Begur", "Roses", "Cadaqués", "Pals", "Lloret de Mar", "Blanes"].includes(l.name));
  
  return (
    <>
      {locationsWithoutShape.map(location => (
        <CircleMarker
          key={location.id}
          center={location.coordinates}
          radius={8}
          pathOptions={{
            color: getScoreColor(location.opportunityIndex),
            weight: 2,
            fillColor: getScoreColor(location.opportunityIndex),
            fillOpacity: 0.8,
          }}
          eventHandlers={{
            click: () => onZoneClick(location),
          }}
        >
          <Tooltip>
            <span>{location.name}<br/>Score: {location.opportunityIndex}%</span>
          </Tooltip>
        </CircleMarker>
      ))}
    </>
  );
}