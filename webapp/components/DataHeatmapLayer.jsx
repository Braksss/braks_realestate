// webapp/components/DataHeatmapLayer.jsx

"use client";

import { GeoJSON } from 'react-leaflet';
import geojsonData from '@/data/map-shapes.json';

// L'échelle de couleur est maintenant plus professionnelle (Bleu -> Vert -> Jaune -> Rouge)
function getColor(value, min, max) {
  if (value === null || value === undefined) return '#e0e0e0'; // Gris pour les zones sans données

  // Normalisation de la valeur entre 0 et 1
  const normalized = (max - min === 0) ? 0.5 : (value - min) / (max - min);

  // Dégradé de couleur
  const r = Math.round(255 * Math.min(1, normalized * 2));
  const g = Math.round(255 * (1 - Math.abs(normalized - 0.5) * 2));
  const b = Math.round(255 * Math.max(0, 1 - normalized * 2));

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
          // On utilise la clé dynamique et les données de la location
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
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.8
    };
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        if (feature.properties.locationData) {
          onZoneClick(feature.properties.locationData);
        }
      },
      mouseover: (e) => {
        e.target.setStyle({ weight: 3, color: '#333' });
        e.target.bindTooltip(
            `<b>${feature.properties.name}</b><br>Score: ${feature.properties.dataValue}%`,
            { permanent: false, direction: 'center', opacity: 0.9 }
        ).openTooltip();
      },
      mouseout: (e) => {
          e.target.setStyle({ weight: 1, color: 'white' });
          e.target.unbindTooltip();
      }
    });
  };

  return (
    <GeoJSON 
      key={JSON.stringify(locations)}
      data={enrichedGeoJson} 
      style={styleFeature}
      onEachFeature={onEachFeature}
    />
  );
}