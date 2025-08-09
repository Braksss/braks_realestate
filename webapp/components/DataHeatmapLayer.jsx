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
  const r = Math.round(Math.min(255, 510 * normalized));
  const g = Math.round(Math.min(255, 510 * (1 - normalized)));
  const b = 0;

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
          unit: dataKey === 'prixMoyenM2' ? '€' : '%',
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
        const layer = e.target;
        layer.setStyle({ weight: 3, color: '#333' });
        const { name, dataValue, unit } = feature.properties;
        const displayValue = dataValue !== null ? `${dataValue.toLocaleString('fr-FR')}${unit}` : 'N/A';
        layer.bindTooltip(`<b>${name}</b><br>${displayValue}`, {
            permanent: false, direction: 'center', opacity: 0.9,
        }).openTooltip();
      },
      mouseout: (e) => {
        e.target.setStyle({ weight: 1, color: 'white' });
        e.target.unbindTooltip();
      }
    });
  };

  return (
    <GeoJSON 
      key={dataKey}
      data={enrichedGeoJson} 
      style={styleFeature}
      onEachFeature={onEachFeature}
    />
  );
}