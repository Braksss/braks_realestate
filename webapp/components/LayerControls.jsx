// webapp/components/LayerControls.jsx
"use client";

// Icônes pour les boutons
const OpportunityIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>;
const PriceIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const TrendIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;

export function LayerControls({ activeLayer, onLayerChange }) {
  
  const layers = [
    { id: 'opportunityIndex', name: 'Opportunité', icon: <OpportunityIcon /> },
    { id: 'prixMoyenM2', name: 'Prix / m²', icon: <PriceIcon /> },
    { id: 'evolution5ans', name: 'Évolution 5 ans', icon: <TrendIcon /> },
  ];

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-white/80 backdrop-blur-md p-2 rounded-full shadow-lg flex items-center gap-2">
      {layers.map(layer => (
        <button
          key={layer.id}
          onClick={() => onLayerChange(layer.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            activeLayer === layer.id
              ? 'bg-orange-500 text-white shadow'
              : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          {layer.icon}
          <span>{layer.name}</span>
        </button>
      ))}
    </div>
  );
}