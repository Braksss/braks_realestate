// webapp/app/dashboard/page.jsx
"use client";

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { locations as allLocations } from '@/data/locations';

const DashboardView = dynamic(
  () => import('@/components/DashboardView'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center"><p>Chargement de votre espace de travail...</p></div>
  }
);

export default function DashboardPage() {
  return (
    // La structure est plus simple et respecte le padding global
    // h-[calc(100vh-8.5rem)] s'assure que le conteneur prend la hauteur restante (hauteur de l'écran - navbar - un peu de padding)
    <div className="h-[calc(100vh-8.5rem)] px-4 pb-4">
        <DashboardView locations={allLocations} />
    </div>
  );
}