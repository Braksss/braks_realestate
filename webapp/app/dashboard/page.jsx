// webapp/app/dashboard/page.jsx
"use client";

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { locations as allLocations } from '@/data/locations';

// On charge une nouvelle vue "Dashboard" qui contiendra vos outils personnels
const DashboardView = dynamic(
  () => import('@/components/DashboardView'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-800 flex items-center justify-center"><p className="text-white">Chargement de votre espace de travail...</p></div>
  }
);

export default function DashboardPage() {
  return (
    // On enlève la marge pour que la carte prenne tout l'écran
    <div className="-mt-24">
        <div className="flex h-screen">
            <DashboardView locations={allLocations} />
        </div>
    </div>
  );
}