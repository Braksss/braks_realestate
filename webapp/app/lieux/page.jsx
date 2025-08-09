"use client"; // On déclare cette page comme un Composant Client pour pouvoir ajouter des filtres

import { useState } from 'react';
import { locations } from '@/data/locations';
import { LocationCard } from '@/components/LocationCard';

export default function AllLocationsPage() {
  // On utilise un état pour gérer les filtres. Pour l'instant, juste un filtre de recherche.
  const [searchTerm, setSearchTerm] = useState('');

  // On filtre la liste des lieux en fonction de la recherche de l'utilisateur
  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold tracking-tighter mb-4">Explorer la Costa Brava</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Utilisez nos outils pour trouver la ville ou le village qui correspond parfaitement à votre projet de vie.
        </p>
      </div>

      {/* --- Section des filtres (très simple pour commencer) --- */}
      <div className="mb-12">
        <input
          type="text"
          placeholder="Rechercher une ville (ex: Begur, Roses...)"
          className="w-full p-4 border border-gray-300 rounded-full text-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* --- Grille des résultats --- */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredLocations.map(loc => (
          <LocationCard key={loc.id} location={loc} />
        ))}
      </div>
      
      {/* Message si aucun résultat n'est trouvé */}
      {filteredLocations.length === 0 && (
        <div className="text-center col-span-full py-16">
          <p className="text-2xl font-semibold">Aucun lieu ne correspond à votre recherche.</p>
          <p className="text-gray-500 mt-2">Essayez un autre terme de recherche.</p>
        </div>
      )}
    </div>
  );
}