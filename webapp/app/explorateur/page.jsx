"use client";

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// On garde ces deux imports statiques car ils ne dépendent pas du navigateur
import { ProjectWizard } from '@/components/ProjectWizard';
import { locations as allLocations } from '@/data/locations';

// --- CORRECTION DÉFINITIVE : ON CHARGE TOUT CE QUI EST LIÉ À LA CARTE EN DYNAMIQUE ---
const MapView = dynamic(
  () => import('@/components/MapView'), // On va créer ce nouveau composant juste après
  { 
    ssr: false, // On désactive totalement le rendu côté serveur pour ce bloc
    loading: () => <div className="w-full h-full bg-gray-200 flex items-center justify-center"><p className="text-gray-600">Chargement de l'explorateur...</p></div>
  }
);

export default function ExplorerPage() {
  return (
    // La page est maintenant beaucoup plus simple.
    // Elle délègue toute la logique de la carte au composant MapView.
    <div className="flex h-[calc(100vh-6rem)]">
        <MapView locations={allLocations} />
    </div>
  );
}