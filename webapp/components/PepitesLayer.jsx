// webapp/components/PepitesLayer.jsx
"use client";

import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';

// Création d'une icône personnalisée pour les pépites
const pepiteIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjRkE5RjIzIiBzdHJva2U9IiNGRkYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5Z29uIHBvaW50cz0iMTIgMiAxNS4wOSAxMCAyMiA5LjI3IDE3IDE0LjE0IDE4LjE4IDIxLjAxIDEyIDE3Ljc3IDUuODIgMjEuMDEgNyAxNC4xNCAyIDkuMjcgOC45MSAxMCAxMiAyIj48L3BvbHlnb24+PC9zdmc+',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
});

export function PepitesLayer({ pepites }) {
  return (
    <>
      {pepites.map(pepite => (
        <Marker
          key={pepite.id}
          position={pepite.coordinates}
          icon={pepiteIcon}
        >
          <Tooltip>
            <div className="font-bold text-base">{pepite.title}</div>
            <div>{pepite.notes}</div>
          </Tooltip>
        </Marker>
      ))}
    </>
  );
}