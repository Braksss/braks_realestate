// webapp/components/PepitesLayer.jsx
"use client";
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';

const createIcon = (color = '#FBBF24', size = 32) => new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}" stroke="#FFFFFF" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`)}`,
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
});

const defaultIcon = createIcon();
const selectedIcon = createIcon('#F97316', 38);

export function PepitesLayer({ pepites, selectedClient }) {
  const clientPepiteIds = selectedClient?.pepiteIds || [];
  
  return (
    <>
      {pepites.map(pepite => {
        const isSelected = clientPepiteIds.includes(pepite.id);
        return (
          <Marker
            key={pepite.id}
            position={pepite.coordinates}
            icon={isSelected ? selectedIcon : defaultIcon}
            zIndexOffset={isSelected ? 1000 : 500}
          >
            <Tooltip>
                <div className="font-bold text-base">{pepite.title}</div>
                <div>{pepite.notes}</div>
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
}