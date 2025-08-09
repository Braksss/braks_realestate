"use client";

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { LocationInfoPanel } from '@/components/LocationInfoPanel';
import { ExplorerControls } from '@/components/ExplorerControls';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { locations } from '@/data/locations';

export default function ExplorerPage() {
  useLockBodyScroll();

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeProfile, setActiveProfile] = useState('famille');

  const Map = useMemo(() => dynamic(
    () => import('@/components/Map').then(mod => mod.Map),
    { 
      loading: () => <div className="h-full w-full flex items-center justify-center bg-gray-200"><p>Chargement de la carte...</p></div>,
      ssr: false
    }
  ), []);
  
  const handleZoneClick = (location) => {
    setSelectedLocation(location);
  };

  const handlePanelClose = () => {
    setSelectedLocation(null);
  }
  
  const locationsWithMatchScore = locations.map(loc => {
    const score = loc.scores ? (loc.scores[activeProfile] || 0) : 0;
    return { ...loc, matchScore: score };
  });

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 6rem)' }}>
      <Map 
        locations={locationsWithMatchScore} 
        onZoneClick={handleZoneClick} 
      />
      <ExplorerControls 
        profile={activeProfile} 
        onProfileChange={setActiveProfile}
      />
      <LocationInfoPanel 
        location={selectedLocation} 
        onClose={handlePanelClose}
      />
    </div>
  );
}
