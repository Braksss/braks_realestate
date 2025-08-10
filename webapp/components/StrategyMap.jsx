// webapp/components/StrategyMap.jsx
"use client";

import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';

const targetIcon = new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F97316" stroke="#FFFFFF" stroke-width="1.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`)}`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
});

export default function StrategyMap({ locations }) {
    return (
        <MapContainer center={[42.02, 3.06]} zoom={9} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
            {locations.map(loc => (
                <Marker key={loc.id} position={loc.coordinates} icon={targetIcon}>
                    <Tooltip><b>{loc.name}</b></Tooltip>
                </Marker>
            ))}
        </MapContainer>
    );
}