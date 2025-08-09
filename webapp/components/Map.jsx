"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function getColor(value) {
  const colors = ['#d1d5db', '#9ca3af', '#6b7280', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d'];
  if (value === null || value === undefined || value < 1) return '#e5e7eb';
  return colors[value - 1];
}

export function Map({ locations, onZoneClick }) {
  const position = [42.02, 3.06];
  
  return (
    <MapContainer center={position} zoom={10} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      
      {locations.map(location => {
        const color = getColor(location.matchScore);
        const radius = 8 + (location.matchScore * 1.5); // Le rayon varie avec le score

        return (
          <CircleMarker
            key={location.id}
            center={location.coordinates}
            radius={radius}
            pathOptions={{
              color: 'white',
              weight: 2,
              fillColor: color,
              fillOpacity: 0.8,
            }}
            eventHandlers={{
              click: () => {
                onZoneClick(location);
              },
            }}
          >
            <Tooltip>
              <span>{location.name} ({location.matchScore}/10)</span>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
