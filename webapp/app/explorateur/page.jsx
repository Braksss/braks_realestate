// webapp/app/explorateur/page.jsx
"use client";

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { locations as allLocations } from '@/data/locations';

const MapView = dynamic(
  () => import('@/components/MapView'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-200 flex items-center justify-center"><p className="text-gray-600">Chargement de l'explorateur...</p></div>
  }
);

export default function ExplorerPage() {
  return (
    <div className="flex h-[calc(100vh-6rem)]">
        <MapView locations={allLocations} />
    </div>
  );
}