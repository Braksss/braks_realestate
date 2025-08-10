// webapp/components/OpportuniteCard.jsx
"use client";

export function OpportuniteCard({ opportunite, onClick }) {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105">
            <div className="relative">
                <img src={opportunite.image} alt={opportunite.titre} className="w-full h-56 object-cover" />
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">OFF-MARKET</div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm font-semibold text-orange-500">{opportunite.localisation}</p>
                <h3 className="text-xl font-bold text-gray-900 mt-1 flex-grow">{opportunite.titre}</h3>
                <p className="text-gray-600 mt-2">Budget : <span className="font-semibold">{opportunite.budget}</span></p>
                <div className="flex flex-wrap gap-2 my-4">
                    {opportunite.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
                <button onClick={onClick} className="mt-auto w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors">
                    Obtenir plus d'informations
                </button>
            </div>
        </div>
    );
}