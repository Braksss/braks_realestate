"use client";

import { GeoJSON } from 'react-leaflet';
import geojsonData from '@/data/map-shapes.json';

// Fonction qui génère une échelle de couleurs en fonction d'une valeur (score)
function getColor(value, min, max) {
  // Échelle de couleurs allant du gris-bleu (faible score) à l'orange vif (score élevé)
  const colors = ['#a6bce3', '#74add1', '#fdbf6f', '#ff7f00', '#e31a1c'];
  
  if (value === null || value === undefined) {
    return '#e0e0e0'; // Gris pour les zones sans données
  }
  
  const range = max - min;
  // Gère le cas où toutes les valeurs sont identiques pour éviter une division par zéro
  if (range === 0) {
    return colors[Math.floor(colors.length / 2)];
  }

  const normalized = (value - min) / range;
  const colorIndex = Math.min(Math.floor(normalized * colors.length), colors.length - 1);
  return colors[colorIndex];
}

export function DataHeatmapLayer({ locations, onZoneClick }) {
  // On récupère les scores de correspondance pour définir l'échelle de couleurs
  const values = locations.map(loc => loc.matchScore).filter(v => v != null && typeof v === 'number');
  
  // On définit des bornes sûres pour l'échelle (de 0 à 10 pour les scores)
  const minValue = 0;
  const maxValue = 10;

  // On enrichit les "dessins" avec vos données (scores, etc.)
  const enrichedGeoJson = {
    ...geojsonData,
    features: geojsonData.features.map(feature => {
      const locationData = locations.find(loc => loc.name === feature.properties.name);
      return {
        ...feature,
        properties: {
          ...feature.properties,
          dataValue: locationData ? locationData.matchScore : null,
          locationData: locationData || null
        }
      };
    })
  };

  // Fonction pour styliser chaque zone en fonction de son score
  const styleFeature = (feature) => {
    const value = feature.properties.dataValue;
    return {
      fillColor: getColor(value, minValue, maxValue),
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.75
    };
  };

  // Fonction pour gérer les interactions (clic, survol)
  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        if (feature.properties.locationData) {
          onZoneClick(feature.properties.locationData);
        }
      },
      mouseover: (e) => e.target.setStyle({ weight: 3, color: '#333' }),
      mouseout: (e) => e.target.setStyle({ weight: 1, color: 'white' })
    });
  };

  return (
    <GeoJSON 
      // Cette clé unique force React à redessiner la couche quand les scores changent
      key={JSON.stringify(locations.map(l => l.matchScore))}
      data={enrichedGeoJson} 
      style={styleFeature}
      onEachFeature={onEachFeature}
    />
  );
}
