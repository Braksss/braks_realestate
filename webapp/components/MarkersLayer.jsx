// webapp/components/MarkersLayer.jsx
"use client";

import { CircleMarker, Tooltip } from 'react-leaflet';
import geojsonData from '@/data/map-shapes.json';

// Noms des villes qui ont déjà des polygones
const citiesWithShapes = geojsonData.features.map(f => f.properties.name);

export function MarkersLayer({ locations, onZoneClick }) {
  // On ne garde que les localisations qui n'ont PAS de polygone défini
  const locationsWithoutShape = locations.filter(l => !citiesWithShapes.includes(l.name));
  
  return (
    <>
      {locationsWithoutShape.map(location => (
        <CircleMarker
          key={location.id}
          center={location.coordinates}
          radius={6}
          pathOptions={{
            color: '#333',
            weight: 1,
            fillColor: '#F97316',
            fillOpacity: 0.9,
          }}
          eventHandlers={{
            click: () => onZoneClick(location),
          }}
        >
          <Tooltip>
            <span>{location.name}</span>
          </Tooltip>
        </CircleMarker>
      ))}
    </>
  );
}