// webapp/components/DashboardMap.jsx
"use client";

import { MapContainer, TileLayer, FeatureGroup, useMapEvents } from 'react-leaflet';
import { PepitesLayer } from '@/components/PepitesLayer';

function MapEvents({ onMapRightClick }) {
  useMapEvents({
    contextmenu: (e) => {
      e.originalEvent.preventDefault();
      onMapRightClick(e);
    },
  });
  return null;
}

export default function DashboardMap({ pepites, onMapRightClick }) {
    return (
        <MapContainer center={[42.02, 3.06]} zoom={10} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
            <PepitesLayer pepites={pepites} />
            <MapEvents onMapRightClick={onMapRightClick} />
        </MapContainer>
    );
}