"use client";

import { useState, useMemo } from 'react';
import { locations } from '@/data/locations';
import { LocationCard } from '@/components/LocationCard';
import { OpportunityModal } from '@/components/OpportunityModal';
import { biensDisponibles } from '@/data/biensDisponibles';

export default function AllLocationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const filteredLocations = useMemo(() =>
    locations.filter(location =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);
  
  // Trouve le bien correspondant à la ville sélectionnée
  const opportunity = useMemo(() => 
    selectedLocation ? biensDisponibles.find(b => b.locationSlug === selectedLocation.slug) : null,
    [selectedLocation]
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tighter mb-4">Explorer le Marché</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos analyses sur les meilleures localités de la Costa Brava.
          </p>
        </div>

        <div className="mb-12">
          <input
            type="text"
            placeholder="Rechercher une ville (ex: Begur, Roses...)"
            className="w-full p-4 border border-gray-300 rounded-full text-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredLocations.map(loc => (
            // On passe une fonction pour ouvrir la modale au lieu d'un lien direct
            <div key={loc.id} onClick={() => setSelectedLocation(loc)}>
              <LocationCard location={loc} />
            </div>
          ))}
        </div>
      </div>
      
      {/* La modale qui s'affichera au clic */}
      {selectedLocation && (
        <OpportunityModal 
          location={selectedLocation}
          bien={opportunity}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </>
  );
}