// webapp/components/FilterPanel.jsx
"use client";

import { useMemo } from 'react';

const getUniqueOptions = (locations, key) => {
  const allValues = locations.flatMap(loc => loc[key]);
  return [...new Set(allValues)].sort();
};

export function FilterPanel({ filters, onFilterChange, locations }) {
  
  const propertyTypes = useMemo(() => getUniqueOptions(locations, 'typeDeBienMajoritaire'), [locations]);
  const allServices = useMemo(() => getUniqueOptions(locations, 'services'), [locations]);

  const handleInputChange = (e) => {
    onFilterChange(e.target.name, e.target.value);
  };
  
  const handleServiceChange = (service) => {
    const newServices = filters.services.includes(service)
      ? filters.services.filter(s => s !== service)
      : [...filters.services, service];
    onFilterChange('services', newServices);
  };

  return (
    <div className="p-6 bg-white h-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Explorer</h2>
      <p className="text-gray-600 mb-8 -mt-4 text-sm">Affinez votre recherche pour trouver la localité idéale.</p>

      <div className="mb-6">
        <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-2">Nom de la ville</label>
        <input
          type="text"
          id="searchTerm"
          name="searchTerm"
          value={filters.searchTerm}
          onChange={handleInputChange}
          placeholder="Ex: Begur, Cadaqués..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Projet de vie</label>
        <select name="profil" value={filters.profil} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500">
          <option value="tous">Tous</option>
          <option value="famille">Projet Familial</option>
          <option value="retraite">Retraite Sereine</option>
          <option value="investissement">Investissement Locatif</option>
        </select>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Type de bien principal</label>
        <select name="propertyType" value={filters.propertyType} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500">
          <option value="tous">Tous types</option>
          {propertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-2">
          Prix max / m²: <span className="font-bold text-orange-600">{Number(filters.maxPrice).toLocaleString('fr-FR')} €</span>
        </label>
        <input type="range" id="maxPrice" name="maxPrice" min="2000" max="7000" step="100" value={filters.maxPrice} onChange={handleInputChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Services et atouts requis</label>
        <div className="flex flex-wrap gap-2">
          {allServices.map(service => (
            <button
              key={service}
              onClick={() => handleServiceChange(service)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                filters.services.includes(service) 
                ? 'bg-orange-500 border-orange-500 text-white' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {service}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}