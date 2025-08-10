// webapp/components/AroundUsMap.jsx
"use client";

import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Le seuil de zoom à partir duquel les marqueurs apparaissent
const ZOOM_LEVEL_THRESHOLD = 12;

function MapEvents({ onBoundsChange, onZoomChange }) {
    const map = useMap();
    useEffect(() => {
        const updateBounds = () => onBoundsChange(map.getBounds());
        const updateZoom = () => onZoomChange(map.getZoom());

        map.on('moveend', updateBounds);
        map.on('zoomend', updateZoom);

        updateBounds();
        updateZoom();

        return () => {
            map.off('moveend', updateBounds);
            map.off('zoomend', updateZoom);
        };
    }, [map, onBoundsChange, onZoomChange]);
    return null;
}

const createIcon = (state) => {
    const size = state === 'hovered' ? 40 : 32;
    const color = state === 'selected' ? '#EF4444' : (state === 'hovered' ? '#F97316' : '#2563EB');
    const outline = '#FFFFFF';

    return new L.Icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="${outline}" stroke-width="1"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`)}`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
    });
};

const icons = {
    default: createIcon('default'),
    hovered: createIcon('hovered'),
    selected: createIcon('selected')
};

export default function AroundUsMap({ locations, onBoundsChange, hoveredLocationId, selectedLocationId, setSelectedLocation }) {
    const [currentZoom, setCurrentZoom] = useState(10);

    return (
        <MapContainer center={[42.02, 3.06]} zoom={10} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png" attribution='&copy; CARTO' />
            <MapEvents onBoundsChange={onBoundsChange} onZoomChange={setCurrentZoom} />

            {/* --- LA CONDITION EST ICI --- */}
            {/* On n'affiche les marqueurs que si le zoom est suffisant */}
            {currentZoom >= ZOOM_LEVEL_THRESHOLD && locations.map(loc => {
                let iconState = 'default';
                if (loc.id === selectedLocationId) iconState = 'selected';
                else if (loc.id === hoveredLocationId) iconState = 'hovered';
                
                return (
                    <Marker 
                        key={loc.id} 
                        position={loc.coordinates} 
                        icon={icons[iconState]}
                        zIndexOffset={loc.id === selectedLocationId ? 2000 : (loc.id === hoveredLocationId ? 1000 : 0)}
                        eventHandlers={{
                            click: () => {
                                setSelectedLocation(loc);
                            },
                        }}
                    >
                        <Tooltip><b>{loc.name}</b></Tooltip>
                    </Marker>
                );
            })}
        </MapContainer>
    );
}