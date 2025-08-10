// webapp/components/FilterPanel.jsx
"use client";
import { useMemo } from 'react';
import styles from './FilterPanel.module.css';

// Fonction pour extraire les options uniques d'un champ
const getUniqueOptions = (locations, key) => {
  const allValues = locations.flatMap(loc => loc[key]);
  return [...new Set(allValues)].sort();
};

export function FilterPanel({ filters, onFilterChange, locations }) {
  const propertyTypes = useMemo(() => getUniqueOptions(locations, 'typeDeBienMajoritaire'), [locations]);
  const allServices = useMemo(() => getUniqueOptions(locations, 'services'), [locations]);

  const handleInputChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };
  
  const handleServiceChange = (service) => {
    const newServices = filters.services.includes(service)
      ? filters.services.filter(s => s !== service)
      : [...filters.services, service];
    onFilterChange({ ...filters, services: newServices });
  };
  
  const handleRangeChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: parseInt(e.target.value, 10) });
  };

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>Filtres du Marché</h2>
      
      <div className={styles.filterGroup}>
        <label htmlFor="searchTerm" className={styles.label}>Nom de la ville</label>
        <input
          type="text"
          id="searchTerm"
          name="searchTerm"
          value={filters.searchTerm}
          onChange={handleInputChange}
          placeholder="Ex: Begur..."
          className={styles.input}
        />
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="propertyType" className={styles.label}>Type de bien majoritaire</label>
        <select name="propertyType" value={filters.propertyType} onChange={handleInputChange} className={styles.input}>
          <option value="tous">Tous types</option>
          {propertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="maxPrice" className={styles.label}>
          Prix max / m²: <span className={styles.priceLabel}>{filters.maxPrice.toLocaleString('fr-FR')} €</span>
        </label>
        <input type="range" id="maxPrice" name="maxPrice" min="2000" max="7000" step="100" value={filters.maxPrice} onChange={handleRangeChange} className={styles.rangeSlider} />
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.label}>Services et atouts requis</label>
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