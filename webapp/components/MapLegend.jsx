"use client";

export function MapLegend() {
  const gradient = 'bg-gradient-to-r from-blue-500 via-yellow-300 to-red-600';

  return (
    <div className="absolute bottom-4 left-4 z-[1000] bg-white/80 backdrop-blur-md p-3 rounded-lg shadow-lg">
      <div className={`w-32 h-2 rounded-full mb-1 ${gradient}`}></div>
      <div className="flex justify-between text-xs text-gray-700 font-semibold">
        <span>Faible</span>
        <span>Élevé</span>
      </div>
    </div>
  )
}