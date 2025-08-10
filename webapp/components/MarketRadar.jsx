// webapp/components/MarketRadar.jsx
"use client";

// Données SIMULÉES qui viendraient de votre base de données
const mockFeedItems = [
    { type: 'social', id: 1, source: 'Facebook - "Vivre à Begur"', content: "Bonjour à tous, nous projetons de vendre notre maison, qui recommanderiez-vous comme agent sérieux ?", link: "#" },
    { type: 'listing', id: 2, source: 'Idealista', title: "Villa 4ch à Begur", price: "1 200 000 €", surface: "280 m²", link: "#" },
    { type: 'social', id: 3, source: 'Facebook - "Costa Brava Expats"', content: "Looking for an estimation of our apartment in Roses before selling. Any advice?", link: "#" },
    { type: 'listing', id: 4, source: 'PAP', title: "Maison de village à Pals", price: "680 000 €", surface: "150 m²", link: "#" },
];

// Composant pour un post social
const SocialCard = ({ item, onCreateProspect }) => (
    <div className="block bg-white p-3 rounded-lg shadow-sm border border-indigo-200">
        <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-indigo-800">{item.source}</span>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">Voir le post</a>
        </div>
        <p className="text-sm text-gray-700 mb-3">"{item.content}"</p>
        <button onClick={() => onCreateProspect(item)} className="w-full text-xs bg-indigo-500 text-white font-semibold py-1 rounded hover:bg-indigo-600">
            + Créer un prospect
        </button>
    </div>
);

// Composant pour une annonce classique
const ListingCard = ({ item }) => (
     <a href={item.link} target="_blank" rel="noopener noreferrer" className="block bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border">
        <div className="flex justify-between items-center mb-1">
            <h3 className="font-semibold text-gray-900 truncate pr-2">{item.title}</h3>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100">{item.source}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span className="font-bold text-orange-600">{item.price}</span>
            <span>{item.surface}</span>
        </div>
    </a>
);

export function MarketRadar({ onCreateProspect }) {
    return (
        <div className="p-4 pt-6 h-full flex flex-col bg-gray-50">
            <h2 className="text-xl font-bold mb-4 flex-shrink-0 text-gray-800">Radar de Marché</h2>
            <div className="flex-grow overflow-y-auto pr-2">
                <div className="space-y-3">
                    {mockFeedItems.map(item => 
                        item.type === 'social' 
                            ? <SocialCard key={item.id} item={item} onCreateProspect={onCreateProspect} /> 
                            : <ListingCard key={item.id} item={item} />
                    )}
                </div>
            </div>
        </div>
    );
}