// webapp/app/explorateur/page.jsx
"use client";

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { locations as allLocations } from '@/data/locations';

// Import dynamique pour éviter les erreurs de rendu côté serveur avec Leaflet
const MapView = dynamic(
  () => import('@/components/MapView'),
  { 
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-600">Chargement de l'Analyseur de Marché...</p>
        </div>
    )
  }
);

export default function ExplorerPage() {
  return (
    // La vue prend toute la hauteur de l'écran moins la barre de navigation
    <div className="h-[calc(100vh-5rem)]">
        <MapView locations={allLocations} />
    </div>
  );
}