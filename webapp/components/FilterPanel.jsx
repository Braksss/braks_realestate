"use client";

export function FilterPanel({ filters, onFilterChange }) {
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="p-6 bg-white h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Filtres</h2>

      {/* Filtre de recherche par nom */}
      <div className="mb-6">
        <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-2">Rechercher par nom</label>
        <input
          type="text"
          id="searchTerm"
          name="searchTerm"
          value={filters.searchTerm}
          onChange={handleInputChange}
          placeholder="Ex: Begur, Roses..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      {/* Filtre par prix */}
      <div className="mb-6">
        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-2">
          Prix max / m²: <span className="font-bold text-orange-600">{filters.maxPrice.toLocaleString('fr-FR')} €</span>
        </label>
        <input
          type="range"
          id="maxPrice"
          name="maxPrice"
          min="2000"
          max="6000"
          step="100"
          value={filters.maxPrice}
          onChange={handleInputChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />
      </div>

      {/* Filtre par profil */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Profil idéal</label>
        <select
          name="profil"
          value={filters.profil}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="tous">Tous les profils</option>
          <option value="familles">Familles</option>
          <option value="retraites">Retraités</option>
          <option value="investisseurs">Investisseurs</option>
        </select>
      </div>

    </div>
  );
}