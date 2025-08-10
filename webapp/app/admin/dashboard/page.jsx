// webapp/app/admin/dashboard/page.jsx
"use client";

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { locations as allLocations } from '@/data/locations';

// Le DashboardView est le composant principal qui organise l'espace de travail
const DashboardView = dynamic(
  () => import('@/components/DashboardView'),
  { 
    ssr: false, // On s'assure que Leaflet ne s'exécute que côté client
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Chargement de votre espace de travail...</p>
      </div>
    )
  }
);

export default function DashboardPage() {
  return (
    // Ce conteneur s'assure que le dashboard remplit l'espace disponible
    <div className="h-[calc(100vh-6.5rem)] px-4 pb-4">
        <DashboardView locations={allLocations} />
    </div>
  );
}