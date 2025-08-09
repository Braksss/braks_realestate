// webapp/components/MarkersLayer.jsx
"use client";

import { CircleMarker, Tooltip } from 'react-leaflet';
import geojsonData from '@/data/map-shapes.json';

// Noms des villes qui ont des polygones
const citiesWithShapes = geojsonData.features.map(f => f.properties.name);

function getScoreColor(score) {
    if (score > 85) return '#d9480f';
    if (score > 70) return '#f97316';
    if (score > 50) return '#f9b572';
    return '#a1a1aa';
}

export function MarkersLayer({ locations, onZoneClick }) {
  // On filtre pour n'afficher que les villes SANS polygone
  const locationsWithoutShape = locations.filter(l => !citiesWithShapes.includes(l.name));
  
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