// webapp/app/explorateur/page.jsx
"use client";

// On importe dynamiquement le composant MapView pour s'assurer
// que les librairies de cartographie ne posent pas de problème au rendu serveur.
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { locations as allLocations } from '@/data/locations';

const MapView = dynamic(
  () => import('@/components/MapView'),
  { 
    ssr: false, // Rendu côté client uniquement
    loading: () => <div className="w-full h-full bg-gray-200 flex items-center justify-center"><p className="text-gray-600">Chargement de l'explorateur de marché...</p></div>
  }
);

export default function ExplorerPage() {
  return (
    // On s'assure que la vue prend toute la hauteur de l'écran, moins la barre de navigation.
    <div className="flex h-[calc(100vh-6rem)]">
        <MapView locations={allLocations} />
    </div>
  );
}