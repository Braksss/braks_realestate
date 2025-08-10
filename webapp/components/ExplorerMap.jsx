// webapp/components/ExplorerMap.jsx
"use client";

import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';

const createIcon = (score, isHovered) => {
    const size = isHovered ? 40 : 32;
    const color = score > 80 ? '#F97316' : (score > 60 ? '#FBBF24' : '#6B7280');
    const outline = isHovered ? '#000000' : '#FFFFFF';

    return new L.Icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="${outline}" stroke-width="1"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`)}`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
    });
};

export default function ExplorerMap({ locations, hoveredLocationId }) {
    const topLocations = locations.slice(0, 50); // On affiche les 50 meilleurs pour ne pas surcharger

    return (
        <MapContainer center={[42.02, 3.06]} zoom={10} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
            {topLocations.map(loc => (
                <Marker 
                    key={loc.id} 
                    position={loc.coordinates} 
                    icon={createIcon(loc.matchScore, loc.id === hoveredLocationId)}
                    zIndexOffset={loc.id === hoveredLocationId ? 1000 : 0}
                >
                    <Tooltip>
                        <b>{loc.name}</b><br/>Match: {loc.matchScore}%
                    </Tooltip>
                </Marker>
            ))}
        </MapContainer>
    );
}