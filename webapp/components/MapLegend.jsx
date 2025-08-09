// webapp/components/MapLegend.jsx
"use client";

export function MapLegend({ range, activeLayer }) {
  
  const legendInfo = {
    opportunityIndex: { title: "Indice d'Opportunité", unit: '%', gradient: 'bg-gradient-to-r from-green-500 to-red-600' },
    prixMoyenM2: { title: "Prix au m²", unit: '€', gradient: 'bg-gradient-to-r from-green-500 to-red-600' },
    evolution5ans: { title: "Croissance sur 5 ans", unit: '%', gradient: 'bg-gradient-to-r from-red-500 to-green-600' }
  };

  const currentLegend = legendInfo[activeLayer] || legendInfo.opportunityIndex;
  const minLabel = `${range.min?.toLocaleString('fr-FR')}${currentLegend.unit}`;
  const maxLabel = `${range.max?.toLocaleString('fr-FR')}${currentLegend.unit}`;

  return (
    <div className="absolute bottom-4 right-4 z-[1000] bg-white/80 backdrop-blur-md p-3 rounded-lg shadow-lg w-48">
      <p className="text-xs font-bold text-gray-700 mb-1 text-center">{currentLegend.title}</p>
      <div className={`w-full h-3 rounded-full mb-1 ${currentLegend.gradient}`}></div>
      <div className="flex justify-between text-xs text-gray-600 font-medium">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  )
}