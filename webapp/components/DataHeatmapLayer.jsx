// webapp/components/DataHeatmapLayer.jsx
"use client";

import { GeoJSON } from 'react-leaflet';
import geojsonData from '@/data/map-shapes.json';

// Fonction pour déterminer la couleur en fonction d'une valeur et d'une plage
function getColor(value, min, max) {
  if (value === null || value === undefined) return '#FFFFFF'; // Gris pour les zones sans données

  const normalized = (max - min === 0) ? 0.5 : (value - min) / (max - min);

  // Dégradé simple de Bleu (bon) à Rouge (mauvais)
  const r = Math.round(255 * normalized);
  const g = 0;
  const b = Math.round(255 * (1 - normalized));

  return `rgb(${r},${g},${b})`;
}

export function DataHeatmapLayer({ locations, onZoneClick, dataKey, range }) {
  
  const enrichedGeoJson = {
    ...geojsonData,
    features: geojsonData.features.map(feature => {
      const locationData = locations.find(loc => loc.name === feature.properties.name);
      return {
        ...feature,
        properties: {
          ...feature.properties,
          dataValue: locationData ? locationData[dataKey] : null,
          locationData: locationData || null
        }
      };
    })
  };

  const styleFeature = (feature) => {
    const value = feature.properties.dataValue;
    return {
      fillColor: getColor(value, range.min, range.max),
      weight: 1.5,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        if (feature.properties.locationData) {
          onZoneClick(feature.properties.locationData);
        }
      },
      mouseover: (e) => e.target.setStyle({ weight: 3, color: '#333' }),
      mouseout: (e) => e.target.setStyle({ weight: 1.5, color: 'white' }),
    });
  };

  return (
    <GeoJSON 
      key={dataKey} // Important pour forcer le re-rendu quand la couche de données change
      data={enrichedGeoJson} 
      style={styleFeature}
      onEachFeature={onEachFeature}
    />
  );
}